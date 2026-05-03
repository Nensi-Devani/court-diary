const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/court-diary");
        const users = await User.find({ role: 'lawyer' });
        console.log("Lawyers count:", users.length);
        users.forEach(u => console.log(u._id, u.name));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

check();
