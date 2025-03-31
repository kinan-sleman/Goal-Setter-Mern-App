const express = require("express");
const { getGoals, deleteGoal, updateGoal, setGoal } = require("../controllers/goalController");
// This variable call express routes
const router = express.Router(); 
router.route("/").get(getGoals).post(setGoal);
router.route("/:id").put(updateGoal).delete(deleteGoal);
// This is a short hand for writing:

// router.get("/", getGoals);
// router.post("/", setGoal);
// router.put("/", updateGoal);
// router.delete("/", deleteGoal);

// export this module
module.exports = router