const express = require("express")
const router = express.Router();

const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");


router.get('/', HomeController.index);

router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.registerUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.post('/recover-password', UserController.recoverPassword);
router.post('/change-password', UserController.changePassword);

module.exports = router;