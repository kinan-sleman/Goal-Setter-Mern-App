const asyncHandler = require("express-async-handler")

/**
 * @description Get Goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Goals Returned Successfully" });
})

/**
 * @description Set Goal
 * @route POST /api/goals
 * @access Private
 */
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Text Field is required");
    }
    res.status(200).json({ message: "Goal Created Successfully" })
})

/**
 * @description Update Goal
 * @route PUT /api/goals/:id
 * @access Private
 */
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Goal ${req.params.id} Updated Successfully` })
})

/**
 * @description Delete Goal
 * @route DELETE /api/goals
 * @access Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Goal ${req.params.id} Deleted Successfully` })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}