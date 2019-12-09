const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.get('/', UserController.user_get_all);

router.get('/:userId', UserController.user_get_user);

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.post('/completeArea/:userId', UserController.user_complete_area);

router.post('/addArea/:userId', UserController.user_add_area);

router.patch('/removeArea/:userId', UserController.user_remove_area);

router.patch('/removeCompletedArea/:userId', UserController.user_remove_completed_area);

router.patch('/:userId', UserController.user_update_user);

router.patch('/total/:userId', UserController.user_update_totals);

router.delete('/:userId', UserController.user_delete_user); //checkAuth, 

module.exports = router;