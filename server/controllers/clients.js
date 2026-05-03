const Client = require("../models/Client");

exports.getClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Admin can see all clients; lawyer only sees their own
    const mongoose = require('mongoose');
    let query = req.user.role === 'admin' ? {} : { userId: new mongoose.Types.ObjectId(req.user.id) };
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }

    const total = await Client.countDocuments(query);
    
    // Use aggregation to count active cases for each client
    const pipeline = [
      { $match: query },
      { $sort: { createdAt: -1 } },
      { $skip: startIndex },
      { $limit: limit },
      {
        $lookup: {
          from: "cases",
          localField: "_id",
          foreignField: "clientId",
          as: "cases"
        }
      },
      {
        $addFields: {
          activeCasesCount: {
            $size: {
              $filter: {
                input: "$cases",
                as: "c",
                cond: { $eq: ["$$c.status", "Active"] }
              }
            }
          }
        }
      },
      { $project: { cases: 0 } }
    ];
    
    const clients = await Client.aggregate(pipeline);

    res.status(200).json({
      success: true,
      count: clients.length,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      data: clients,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getClient = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user.id };
    const client = await Client.findOne(query);
    if (!client) {
      return res.status(404).json({ success: false, error: "Client not found" });
    }
    res.status(200).json({ success: true, data: client });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    if (req.file) {
      req.body.avatar = req.file.path;
    }
    const client = await Client.create(req.body);
    res.status(201).json({ success: true, data: client });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user.id };

    if (req.file) {
      req.body.avatar = req.file.path;
    }

    const client = await Client.findOneAndUpdate(query, req.body, { new: true, runValidators: true });
    if (!client) {
      return res.status(404).json({ success: false, error: "Client not found" });
    }
    res.status(200).json({ success: true, data: client });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user.id };
    const client = await Client.findOne(query);
    if (!client) {
      return res.status(404).json({ success: false, error: "Client not found" });
    }
    await client.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

