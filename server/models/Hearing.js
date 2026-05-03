const mongoose = require("mongoose");

const HearingSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case",
    required: true
  },
  hearingDate: { type: Date, required: true },
  nextHearingDate: Date,
  notes: String,
  status: {
    type: String,
    enum: [
      "Scheduled",
      "Adjourned",
      "Completed",
      "Cancelled",
      "Postponed",
      "In Progress",
      "Missed",
      "Rescheduled"
    ],
    default: "Scheduled"
  },
  feeAmount: Number,
  payment: {
    status: {
      type: String,
      enum: ["paid", "unpaid", "partial"],
      default: "unpaid"
    },
    date: Date,
    method: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

HearingSchema.index({ caseId: 1 });
HearingSchema.index({ hearingDate: 1 });

module.exports = mongoose.model("Hearing", HearingSchema);
