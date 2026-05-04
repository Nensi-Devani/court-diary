const Case = require("../models/Case");
const { cloudinary } = require("../middlewares/upload");

exports.getCases = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Admin sees all cases; lawyers see only their own
    let query = req.user.role === 'admin' ? {} : { userId: req.user.id };

    if (req.query.status) query.status = req.query.status;
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { caseNo: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const total = await Case.countDocuments(query);
    let sortQuery = { createdAt: -1 };
    if (req.query.sort === "dateAsc") sortQuery = { createdAt: 1 };
    if (req.query.sort === "nameAsc") sortQuery = { title: 1 };
    if (req.query.sort === "nameDesc") sortQuery = { title: -1 };

    const cases = await Case.find(query).populate('clientId', 'name avatar').sort(sortQuery).skip(startIndex).limit(limit);

    res.status(200).json({
      success: true,
      count: cases.length,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      data: cases,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getCase = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user.id };
    const caseItem = await Case.findOne(query).populate('clientId', 'name');
    if (!caseItem) return res.status(404).json({ success: false, error: "Case not found" });
    res.status(200).json({ success: true, data: caseItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createCase = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    const caseItem = await Case.create(req.body);
    res.status(201).json({ success: true, data: caseItem });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
exports.updateCase = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user.id };
    const caseItem = await Case.findOneAndUpdate(query, req.body, { new: true, runValidators: true });
    if (!caseItem) return res.status(404).json({ success: false, error: "Case not found" });
    res.status(200).json({ success: true, data: caseItem });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteCase = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user.id };
    const caseItem = await Case.findOne(query);
    if (!caseItem) return res.status(404).json({ success: false, error: "Case not found" });
    await caseItem.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.uploadCaseDocument = async (req, res) => {
  try {
    const query = req.user.role === 'admin' 
      ? { _id: req.params.id } 
      : { _id: req.params.id, userId: req.user.id };
      
    const caseItem = await Case.findOne(query);
    if (!caseItem) {
      return res.status(404).json({ success: false, error: "Case not found" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, error: "Please upload a file" });
    }

    const { category } = req.body;
    if (!["court", "evidence", "client"].includes(category)) {
      return res.status(400).json({ success: false, error: "Invalid category" });
    }

    caseItem.uploads.push({
      url: req.file.path,
      category,
    });

    await caseItem.save();

    res.status(200).json({ success: true, data: caseItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteCaseDocument = async (req, res) => {
  try {
    const query = req.user.role === 'admin' 
      ? { _id: req.params.id } 
      : { _id: req.params.id, userId: req.user.id };
      
    const caseItem = await Case.findOne(query);
    if (!caseItem) {
      return res.status(404).json({ success: false, error: "Case not found" });
    }

    // Use pull to remove the subdocument
    caseItem.uploads.pull(req.params.docId);

    await caseItem.save();

    res.status(200).json({ success: true, data: caseItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
