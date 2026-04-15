import User from '../models/User.js';

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) { 
      return next(err);
    }
    
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      
      // connect.sid is the default cookie name
      res.clearCookie('connect.sid'); 
      
      // headers for clearing the cache
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
      
      res.redirect('/login'); 
    });
  });
};


const registerUser = async (req, res) => {
    try {
        // take all fields from user's request
        const { name, username, email, password, role } = req.body;

        // check that all fields are filled
        if (!name || !username || !email || !password || !role) {
            return res.status(400).json({error: 'Please fill all required fields'})
        }

        // check that the passwords match
        // if (password !== passwordConfirm) {
        //     return res.status(400).json({error: 'Passwords do not match.'})
        // }

        // check for duplicate email address
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: 'A user with this email address already exists.'})
        }

        // create a user
        const user = await User.create({
            name,
            username,
            email,
            passwordHash: password,
            role: role || 'user'
        })

        // send success response, without the password hash
        res.status(201).json({
            message: 'User successfully registered.',
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                role: user.role

            }
        })
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user:', details: error.message})
    }
}

export  { registerUser, logout };