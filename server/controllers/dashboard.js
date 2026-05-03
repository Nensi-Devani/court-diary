const Case = require("../models/Case");
const Hearing = require("../models/Hearing");
const Meeting = require("../models/Meeting");
const User = require("../models/User");

exports.getUserStats = async (req, res) => {
  try {
    const activeCases = await Case.countDocuments({ userId: req.user.id, status: "Active" });
    
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Get hearing today (requires joining with case to check userId)
    const cases = await Case.find({ userId: req.user.id }).select("_id");
    const caseIds = cases.map(c => c._id);
    
    const totalCases = await Case.countDocuments({ userId: req.user.id });
    
    const todayHearings = await Hearing.countDocuments({
      caseId: { $in: caseIds },
      hearingDate: { $gte: startOfDay, $lte: endOfDay }
    });

    const totalHearings = await Hearing.countDocuments({
      caseId: { $in: caseIds }
    });

    const todayMeetings = await Meeting.countDocuments({
      userId: req.user.id,
      startDatetime: { $gte: startOfDay, $lte: endOfDay }
    });

    const pendingPayments = await Case.countDocuments({
      userId: req.user.id,
      paymentStatus: "Pending"
    });

    res.status(200).json({
      success: true,
      data: {
        activeCases,
        totalCases,
        todayHearings,
        totalHearings,
        todayMeetings,
        pendingPayments
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAdminStats = async (req, res) => {
    try {
        const totalLawyers = await User.countDocuments({ role: "lawyer" });
        const totalCases = await Case.countDocuments({});
        const activeCases = await Case.countDocuments({ status: "Active" });
        const totalClients = await require("../models/Client").countDocuments({});
        
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const todayHearings = await Hearing.countDocuments({
            hearingDate: { $gte: startOfDay, $lte: endOfDay }
        });

        const todayMeetings = await Meeting.countDocuments({
            startDatetime: { $gte: startOfDay, $lte: endOfDay }
        });

        res.status(200).json({
            success: true,
            data: {
                totalLawyers,
                totalCases,
                activeCases,
                totalClients,
                todayHearings,
                todayMeetings
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
