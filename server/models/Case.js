const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: false
  },
  caseNo: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  previousHearingSummary: String,
  hearingNotes: String,
  location: String,
  status: {
    type: String,
    enum: ["Active", "Inactive", "Reopened"],
    default: "Active"
  },
  // Payment details
  paymentAmount: { type: Number, default: 0 },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Partial", "Paid", "Waived"],
    default: "Pending"
  },
  paymentDate: { type: Date },
  paymentNotes: { type: String },
  parties: [
    {
      name: String,
      type: {
        type: String,
        enum: ["lawyer", "client"]
      },
      notes: String,
      avatar: String
    }
  ],
  uploads: [
    {
      url: String,
      category: {
        type: String,
        enum: ["court", "evidence", "client"]
      },
      uploadedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CaseSchema.index({ userId: 1 });
CaseSchema.index({ caseNo: 1 });

module.exports = mongoose.model("Case", CaseSchema);

