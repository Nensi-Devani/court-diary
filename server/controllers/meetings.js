const Meeting = require("../models/Meeting");
const sendEmail = require("../utils/sendEmail");

exports.getMeetings = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 50;
    const startIndex = (page - 1) * limit;

    // Admin can view any lawyer's meetings by passing ?userId=<id>
    let query = {};
    if (req.user.role === 'admin' && req.query.userId) {
      query.userId = req.query.userId;
    } else {
      query.userId = req.user.id;
    }

    if (req.query.status) query.status = req.query.status;
    if (req.query.startDate && req.query.endDate) {
      query.startDatetime = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const total = await Meeting.countDocuments(query);
    const meetings = await Meeting.find(query)
      .sort({ startDatetime: 1 })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: meetings.length,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      data: meetings,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.createMeeting = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    const meeting = await Meeting.create(req.body);

    if (req.body.clientEmail) {
      const message = `
        <h1>Meeting Scheduled</h1>
        <p>A new meeting "<strong>${meeting.title}</strong>" has been scheduled.</p>
        <p><strong>Start:</strong> ${new Date(meeting.startDatetime).toLocaleString()}</p>
        <p><strong>End:</strong> ${new Date(meeting.endDatetime).toLocaleString()}</p>
        <p>${meeting.description || ''}</p>
      `;
      try {
        await sendEmail({
          email: req.body.clientEmail,
          subject: "Meeting Scheduled - CourtDiary",
          html: message,
        });
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr);
      }
    }

    res.status(201).json({ success: true, data: meeting });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!meeting) {
      return res.status(404).json({ success: false, error: "Meeting not found" });
    }
    res.status(200).json({ success: true, data: meeting });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ _id: req.params.id, userId: req.user.id });
    if (!meeting) {
      return res.status(404).json({ success: false, error: "Meeting not found" });
    }
    await meeting.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
