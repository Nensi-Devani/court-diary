const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: { type: String, required: true },
  phone: String,
  avatar: String,
  address: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

ClientSchema.index({ userId: 1 });

module.exports = mongoose.model("Client", ClientSchema);
