const router = require("express").Router();
const {
  getUserData,
  addTodo,
  editTodo,
  removeTodo,
  addProject,
  removeProject,
  priority,
} = require("../controllers/tasks");

// auth middleware
const auth = require("../auth/auth");

router.get("/todos", auth, getUserData);
router.post("/add-todo", auth, addTodo);
router.put("/edit-todo", auth, editTodo);
router.post("/remove-todo", auth, removeTodo);
router.post("/add-project", auth, addProject);
router.post("/remove-project", auth, removeProject);
router.post("/priority", auth, priority);

module.exports = router;
