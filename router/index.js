const commentController = require("../controllers/commentController");
const eventController = require("../controllers/eventController");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth-middleware");

const Router = require("express").Router;
// const userController = require('../controllers/user-controller');
const router = new Router();
// const { body } = require('express-validator');
// const authMiddleware = require('../middlewares/auth-middleware');

router.get("/get", userController.getUsers);
router.get("/getUser", userController.getUser);
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get("/events", eventController.getEvents);
router.get("/event/:id", eventController.getEvent);
router.post("/event", eventController.createEvent); // add middleware
router.put("/event/:id", eventController.editEvent); // add middleware
router.delete("/event/:id", eventController.deleteEvent); // add middleware

router.get("/comment/:eventId", commentController.getComments);
router.post("/comment/:eventId", commentController.createComment); // add middleware
router.put("/comment/:commentId", commentController.updateComment); // add middleware
router.delete("/comment/:commentId", commentController.deleteComment); // add middleware

module.exports = router;
