const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const apiResponse = require('../utils/apiResponse')
const { generateToken } = require('../utils/generateToken')

/**
 * @description Register New User
 * @route POST /api/users
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields")
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(404)
        throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    if (user) {
        const statusCode = 200;
        res.status(statusCode).json({
            status: statusCode,
            message: "User Registered Successfully",
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user?._id)
            }
        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }
})

/**
 * @description Authenticate A User
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        apiResponse(res, 200, "User Authenticated Successfully", {
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user?._id)
        });
    } else {
        res.status(400);
        throw new Error("Invalid user credential")
    }
})

/**
 * @description Get A User Data
 * @route GET /api/users/me
 * @access private
 */
const getMe = asyncHandler(async (req, res) => {
    apiResponse(res, 200, "Data Fetched Successfully", req.user);
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
}