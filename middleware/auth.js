// check if the user has the cookie
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  if (!req.session.messages) {
    req.session.messages = [];
  }
  // Show the error message
  req.session.messages.push('You must be logged in to view this page.');
  res.redirect('/api/auth/login'); 
};

// check if the user is admin
export const isAdmin = (req, res, next) => {
  // check if they are logged in
  if (!req.isAuthenticated()) {
    req.session.messages = ['Please log in first.'];
    return res.redirect('/api/auth/login');
  }

  // Check if the role is admin
  if (req.user.role === 'admin') {
    return next();
  }

  res.status(403).send('Access Denied: Only Admins can perform this action.');
};