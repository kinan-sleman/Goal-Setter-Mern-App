const asyncHandler = require("express-async-handler")
const Goal = require("../models/goalModel")
const User = require("../models/userModel")
const apiResponse = require("../utils/apiResponse")

/**
 * @description Get Goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    apiResponse(res, 200, "Goals Fetched Successfully", goals)
})

/**
 * @description Set Goal
 * @route POST /api/goals
 * @req { text : string}
 * @access Private
 */
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Text Field is required");
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });
    apiResponse(res, 200, "Goal Created Successfully", goal)
})

/**
 * @description Update Goal
 * @route PUT /api/goals/:id
 * @access Private
 */
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Goal Not Found")
    }
    const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id,
        { ...req.body, user: req.user.id },
        { new: true }
    )
    if(!req.user) {
        res.status(404);
        throw new Error("User not found")
    }
    if(req.user.id !== goal.user.toString()) {
        res.status(401);
        throw new Error("Not Authorized")
    }
    apiResponse(res, 200, "Goal Updated Successfully", updatedGoal)
})

/**
 * @description Delete Goal
 * @route DELETE /api/goals/:id
 * @access Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findByIdAndDelete(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error("Goal Not Found")
    }
    if(!req.user) {
        res.status(404);
        throw new Error("User not found")
    }
    if(req.user.id !== goal.user.toString()) {
        res.status(401);
        throw new Error("User Not Authorized")
    }
    apiResponse(res, 200, "Goal Deleted Successfully", goal)
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}