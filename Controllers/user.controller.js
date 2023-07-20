const User = require("./../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password: hashedPassword });
        return res.status(201).json({ success: true, user });
    } catch (error) {
        return next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("User Not Found");
            error.status = 404;
            throw error;
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            const error = new Error("Incorrect Password");
            error.status = 401;
            throw error;
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "3d" });

        return res.status(200).json({ success: true, token });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    loginUser,
    registerUser,
};
