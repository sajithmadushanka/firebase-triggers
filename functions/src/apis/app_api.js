const router = require('express').Router();
const userController = require('../controllers/user_controller');
const dependentController = require('../controllers/dependent_controller');
router.get('/hello', async (req, res) => {
  res.send('Hello from Firebase!');
});
router.get('/user', async (req, res) =>
    userController.getUsers(req, res)
)

router.post('/user', async (req, res) =>
    userController.createUser(req, res)
)
router.put('/user/:id', async (req, res) =>
    userController.updateUser(req, res)
)

router.delete('/user/:id', async (req, res) =>
    userController.deleteUser(req, res)
)
// dependent------------
router.get('/dependent', async (req, res) =>
    dependentController.getDependents(req, res)
)
router.post('/dependent', async (req, res) =>
    dependentController.createDependent(req, res)
)
module.exports = router;