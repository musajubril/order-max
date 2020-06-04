module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/admin/login');
  },
  forwardAdmin: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/admin');      

  },
  forwardClient: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/client');      
  }
  // forwardUser: function(req, res, next) {
  //   if (!req.isAuthenticated()) {
  //     return next();
  //   }
  //   res.redirect('/user');      
  // }
};
