const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: { type: String, required: true },
  startDatetime: { type: Date, required: true },
  endDatetime: { type: Date, required: true },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
  clientEmail: { type: String },
  description: { type: String },
  status: {
    type: String,
    enum: ["upcoming", "completed", "cancelled"],
    default: "upcoming"
  },
  createdAt: { type: Date, default: Date.now }
});

MeetingSchema.index({ userId: 1, startDatetime: 1 });

module.exports = mongoose.model("Meeting", MeetingSchema);
