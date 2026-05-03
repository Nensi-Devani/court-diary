const User = require("./models/User");
const Case = require("./models/Case");
const Hearing = require("./models/Hearing");
const Client = require("./models/Client");
const Meeting = require("./models/Meeting");
const Notification = require("./models/Notification");
const mongoose = require("mongoose");

const seedData = async () => {
  try {
    console.log("Cleaning and Seeding dummy data...");

    await User.deleteMany({});
    await Case.deleteMany({});
    await Hearing.deleteMany({});
    await Client.deleteMany({});
    await Meeting.deleteMany({});
    await Notification.deleteMany({});

    // ── Admin ────────────────────────────────────────────────────────────
    const adminId = new mongoose.Types.ObjectId("65f1a1a1a1a1a1a1a1a1a1a1");
    await User.create({
      _id: adminId,
      name: "Super Admin",
      email: "admin@example.com",
      password: "password123",
      isVerified: true,
      role: "admin",
    });

    // ── Lawyers (5) ──────────────────────────────────────────────────────
    const lawyerIds = [
      "661a1f01a1b2c3d4e5f60101",
      "661a1f01a1b2c3d4e5f60102",
      "661a1f01a1b2c3d4e5f60103",
      "661a1f01a1b2c3d4e5f60104",
      "661a1f01a1b2c3d4e5f60105",
    ].map(id => new mongoose.Types.ObjectId(id));

    const lawyersData = [
      {
        _id: lawyerIds[0], name: "Rajesh Sharma", email: "rajesh.sharma@gmail.com",
        password: "password123", isVerified: true, role: "lawyer",
        phone: "9876543210",
        office: { name: "Sharma Legal Associates", email: "contact@sharmalegal.in", address: "201, SG Highway, Ahmedabad, Gujarat", phone: "07926543210" }
      },
      {
        _id: lawyerIds[1], name: "Priya Mehta", email: "priya.mehta@yahoo.com",
        password: "password123", isVerified: true, role: "lawyer",
        phone: "9825012345",
        office: { name: "Mehta Law Firm", email: "info@mehtalawfirm.com", address: "Andheri East, Mumbai, Maharashtra", phone: "02223456789" }
      },
      {
        _id: lawyerIds[2], name: "Amit Patel", email: "amit.patel@gmail.com",
        password: "password123", isVerified: true, role: "lawyer",
        phone: "9909011122",
        office: { name: "Patel & Co.", email: "office@patelco.in", address: "Ring Road, Surat, Gujarat", phone: "02612233445" }
      },
      {
        _id: lawyerIds[3], name: "Vikram Singh", email: "vikram.singh@gmail.com",
        password: "password123", isVerified: true, role: "lawyer",
        phone: "9811122233",
        office: { name: "Singh Law Chambers", email: "chambers@singhlaw.in", address: "Connaught Place, Delhi", phone: "01144556677" }
      },
      {
        _id: lawyerIds[4], name: "Sneha Iyer", email: "sneha.iyer@gmail.com",
        password: "password123", isVerified: true, role: "lawyer",
        phone: "9887766554",
        office: { name: "Iyer Legal Consultancy", email: "sneha@iyerlegal.com", address: "Pearson Hardman Tower, Pune", phone: "04422334455" }
      },
    ];

    for (const lawyer of lawyersData) {
      await User.create(lawyer);
    }

    const primaryLawyerId = lawyerIds[0]; // John Lawyer is the primary lawyer

    // ── Clients (5) ──────────────────────────────────────────────────────
    const clientIds = [
      "65f1c1c1c1c1c1c1c1c1c1c1",
      "65f1c1c1c1c1c1c1c1c1c1c2",
      "65f1c1c1c1c1c1c1c1c1c1c3",
      "65f1c1c1c1c1c1c1c1c1c1c4",
      "65f1c1c1c1c1c1c1c1c1c1c5",
    ].map(id => new mongoose.Types.ObjectId(id));

    await Client.insertMany([
      { _id: clientIds[0], userId: primaryLawyerId, name: "Ramesh Verma", phone: "9898989898", address: "Navrangpura, Ahmedabad, Gujarat", description: "Property dispute client" },
      { _id: clientIds[1], userId: primaryLawyerId, name: "Sunita Desai", phone: "9871234567", address: "Borivali West, Mumbai, Maharashtra", description: "Contract negotiation" },
      { _id: clientIds[2], userId: primaryLawyerId, name: "Karan Shah", phone: "9823456789", address: "Adajan, Surat, Gujarat", description: "Business owner" },
      { _id: clientIds[3], userId: primaryLawyerId, name: "Lakshmi Nair", phone: "9765432109", address: "Anna Nagar, Chennai, Tamil Nadu", description: "Acquisition dispute" },
      { _id: clientIds[4], userId: primaryLawyerId, name: "Anil Gupta", phone: "9812345678", address: "Karol Bagh, Delhi", description: "Sponsorship legalities" },
    ]);

    // ── Cases (5) with payment details ───────────────────────────────────
    const caseIds = [
      "65f1d1d1d1d1d1d1d1d1d1d1",
      "65f1d1d1d1d1d1d1d1d1d1d2",
      "65f1d1d1d1d1d1d1d1d1d1d3",
      "65f1d1d1d1d1d1d1d1d1d1d4",
      "65f1d1d1d1d1d1d1d1d1d1d5",
    ].map(id => new mongoose.Types.ObjectId(id));

    await Case.insertMany([
      {
        _id: caseIds[0], userId: primaryLawyerId, caseNo: "CASE-2026-001", title: "Sharma vs Verma",
        description: "Property boundary dispute between neighbours.", status: "Active",
        location: "Ahmedabad District Court",
        parties: [{ name: "Ramesh Verma", type: "client" }, { name: "Amit Patel", type: "lawyer" }],
        paymentAmount: 50000, paymentStatus: "Paid", paymentDate: new Date("2026-03-15"), paymentNotes: "Full payment via NEFT"
      },
      {
        _id: caseIds[1], userId: primaryLawyerId, caseNo: "CASE-2026-002", title: "Mehta vs State",
        description: "Social media acquisition dispute.", status: "Active",
        location: "Mumbai High Court",
        parties: [{ name: "Vraj Mehta", type: "client" }, { name: "Vikram Singh", type: "lawyer" }],
        paymentAmount: 200000, paymentStatus: "Partial", paymentDate: new Date("2026-04-01"), paymentNotes: "50% advance paid"
      },
      {
        _id: caseIds[2], userId: primaryLawyerId, caseNo: "CASE-2026-003", title: "Patel vs Desai",
        description: "Contract breach for endorsement deal.", status: "Active",
        location: "Surat Civil Court",
        parties: [{ name: "Sumit Desai", type: "client" }, { name: "Amit Patel", type: "lawyer" }],
        paymentAmount: 75000, paymentStatus: "Pending", paymentNotes: "Pay fees in 5 days"
      },
      {
        _id: caseIds[3], userId: primaryLawyerId, caseNo: "CASE-2026-004", title: "Iyer vs Kumar",
        description: "Libel and defamation suit.", status: "Inactive",
        location: "Chennai Family Court",
        parties: [{ name: "Anil Kumar", type: "client" }],
        paymentAmount: 30000, paymentStatus: "Pending", paymentNotes: "Half paid"
      },
      {
        _id: caseIds[4], userId: primaryLawyerId, caseNo: "CASE-2026-005", title: "Singh vs Corporation",
        description: "Sponsorship conflict over exclusive rights.", status: "Reopened",
        location: "Delhi High Court",
        parties: [{ name: "Karan Shah", type: "client" }, { name: "Priya Mehta", type: "lawyer" }],
        paymentAmount: 90000, paymentStatus: "Partial", paymentDate: new Date("2026-04-10"), paymentNotes: "First instalment received via cheque"
      },
    ]);

    // ── Hearings (5) ─────────────────────────────────────────────────────
    const now = new Date();
    await Hearing.insertMany([
      { caseId: caseIds[0], hearingDate: new Date(now.getTime() + 2 * 86400000), status: "Scheduled", notes: "Final arguments to be presented" },
      { caseId: caseIds[1], hearingDate: new Date(now.getTime() + 5 * 86400000), status: "Scheduled", notes: "Discovery phase documents review" },
      { caseId: caseIds[2], hearingDate: new Date(now.getTime() + 7 * 86400000), status: "Scheduled", notes: "Expert testimony session" },
      { caseId: caseIds[3], hearingDate: new Date(now.getTime() - 10 * 86400000), status: "Completed", notes: "Pre-trial conference completed" },
      { caseId: caseIds[4], hearingDate: new Date(now.getTime() + 14 * 86400000), status: "Scheduled", notes: "Jury selection and opening statements" },
    ]);

    // ── Meetings (5 for primary lawyer) ──────────────────────────────────
    await Meeting.insertMany([
      {
        userId: primaryLawyerId,
        title: "Consultation with Ramesh Gupta",
        startDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 10, 0),
        endDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 11, 0),
        status: "upcoming"
      },
      {
        userId: primaryLawyerId,
        title: "Meeting with Divyaben",
        startDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 14, 0),
        endDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 15, 30),
        status: "upcoming"
      },
      {
        userId: primaryLawyerId,
        title: "Anil Case Briefing",
        startDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 11, 0),
        endDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 12, 0),
        status: "completed"
      },
      {
        userId: primaryLawyerId,
        title: "Karan Shah's Counsel",
        startDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 10, 0),
        endDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 11, 0),
        status: "upcoming"
      },
      {
        userId: primaryLawyerId,
        title: "Emergency Case Review",
        startDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 16, 0),
        endDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 17, 0),
        status: "completed"
      },
      // 5 meetings for Sarah Connor (lawyer 2)
      {
        userId: lawyerIds[1],
        title: "Client Brief - Sarah #1",
        startDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0),
        endDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0),
        status: "upcoming"
      },
      {
        userId: lawyerIds[1],
        title: "Court Prep - Sarah #2",
        startDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 11, 0),
        endDatetime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 12, 0),
        status: "upcoming"
      },
    ]);

    // ── Notifications (5) ─────────────────────────────────────────────────
    await Notification.insertMany([
      { userId: primaryLawyerId, title: "Case Updated", message: "Smith vs. Doe hearing rescheduled to next Monday." },
      { userId: primaryLawyerId, title: "New Document", message: "Elon Musk uploaded acquisition agreement." },
      { userId: primaryLawyerId, title: "Meeting Reminder", message: "Consultation with Jane Smith tomorrow at 10:00 AM." },
      { userId: primaryLawyerId, title: "Payment Received", message: "Payment of ₹50,000 received for Smith vs. Doe." },
      { userId: primaryLawyerId, title: "Hearing Scheduled", message: "Jordan vs. Nike hearing set for next week." },
    ]);

    console.log("✅ Data Seeded Successfully!");
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
  }
};

module.exports = seedData;
