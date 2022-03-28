var express = require("express")
var app = express();
var router = express.Router();

var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");


router.get('/', HomeController.index);

router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.registerUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;