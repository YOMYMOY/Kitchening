const express = require('express');
const router = express.Router();

const { formRegister, formLogin, profile, register, login, logout } = require('../controllers/usersController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { usersRegisterValidator, usersLoginValidator } = require('../validations/validations');


/* /users */
router
  .get('/register', guestMiddleware, formRegister)
  .post('/register', usersRegisterValidator, register)
  .get('/login', guestMiddleware, formLogin)
  .post('/login', usersLoginValidator, login)
  .get('/profile', authMiddleware,profile)
  .get('/logout', logout)

module.exports = router;
