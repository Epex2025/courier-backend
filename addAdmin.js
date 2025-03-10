require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

const addAdmin = async () => {
    const email = "admin@epexindia.in";
    const password = "admin123"; // Set your password

    // ✅ Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        console.log("Admin already exists!");
        mongoose.connection.close();
        return;
    }

    // ✅ Hash Password & Save Admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });

    await newAdmin.save();
    console.log("✅ Admin added successfully!");
    mongoose.connection.close();
};

addAdmin();
