const asyncHandler = require("express-async-handler")
const Goal = require("../models/goalModel")

/**
 * @description Get Goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find() // we can type find({}) to find by user for example, but if we need to fetch all we just type find()
    const statusCode = 200
    res.status(statusCode).json({ status: statusCode, message: "Goals Fetched Successfully", data: goals });
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
        text: req.body.text
    });
    const statusCode = 200
    res.status(statusCode).json({ status: statusCode, message: "Goal Created Successfully", data: goal })
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
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true  // to create if doesn't exist
    })
    const statusCode = 200;
    res.status(statusCode).json({ status: statusCode, message: `Goal Updated Successfully`, data: updatedGoal })
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
    const statusCode = 200;
    res.status(statusCode).json({ status: statusCode, message: `Goal Deleted Successfully`, data: goal })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}