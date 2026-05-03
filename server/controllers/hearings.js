const Hearing = require("../models/Hearing");

exports.getHearings = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Only show hearings for cases belonging to the user
    const Case = require("../models/Case");
    const userCases = await Case.find({ userId: req.user.id }).select("_id");
    const caseIds = userCases.map(c => c._id);

    let query = { caseId: { $in: caseIds } };

    if (req.query.caseId) {
      query.caseId = req.query.caseId;
    }
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.startDate && req.query.endDate) {
      query.hearingDate = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }
    const hearings = await Hearing.find(query)
      .sort({ hearingDate: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate("caseId", "title caseNo");

    res.status(200).json({
      success: true,
      count: hearings.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      data: hearings,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getHearing = async (req, res) => {
  try {
    const hearing = await Hearing.findById(req.params.id).populate("caseId");
    if (!hearing) {
      return res.status(404).json({ success: false, error: "Hearing not found" });
    }
    res.status(200).json({ success: true, data: hearing });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createHearing = async (req, res) => {
  try {
    const hearing = await Hearing.create(req.body);
    res.status(201).json({ success: true, data: hearing });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateHearing = async (req, res) => {
  try {
    const hearing = await Hearing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!hearing) {
      return res.status(404).json({ success: false, error: "Hearing not found" });
    }
    res.status(200).json({ success: true, data: hearing });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteHearing = async (req, res) => {
  try {
    const hearing = await Hearing.findById(req.params.id);
    if (!hearing) {
      return res.status(404).json({ success: false, error: "Hearing not found" });
    }
    await hearing.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
