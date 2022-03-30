const express = require("express")
const router = express.Router();

const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");

var adminAuth = require("../middlewares/AdminAuth");

router.get('/', HomeController.index);

router.post('/login', UserController.login);

router.get('/users', adminAuth, UserController.getAllUsers);
router.get('/users/:id', adminAuth, UserController.getUserById);
router.post('/users', UserController.registerUser);
router.put('/users/:id', adminAuth, UserController.updateUser);
router.delete('/users/:id', adminAuth, UserController.deleteUser);

router.post('/recover-password', UserController.recoverPassword);
router.post('/change-password', UserController.changePassword);

module.exports = router;