const withAuth = (req, res, next) => {
  if (!req.session || !req.session.user_id) {
      console.error("User is not authenticated. Redirecting to login page.");
      res.status(401).redirect('/login');
  } else {
      next();
  }
};

module.exports = withAuth;