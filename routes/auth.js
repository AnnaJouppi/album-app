import express from 'express';
import passport from 'passport';
import { registerUser, logout } from '../controllers/users.js';

const router = express.Router()

// Shows the login page when someone visits /api/auth/login
router.get('/login', (req, res) => {
  // Grab the messages from the session
  const messages = req.session.messages || [];
  
  req.session.messages = [];
  
  res.render('login', { messages: messages }); 
});

// Passport route handler for password auth
router.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/add-album',
    failureRedirect: '/api/auth/login',
    failureMessage: true
  })
)

router.get('/register', (req, res) => {
  res.render('register'); 
});

router.post('/register', registerUser)
// the logout route
router.post('/logout', logout);


export default router;