// utils/check_role.js
function isModerator(req, res, next) {
    if (req.user?.role === 'mod' || req.user?.role === 'admin') return next();
    return res.status(403).send({ success: false, message: "Require Moderator Role" });
  }
  
  function isAdmin(req, res, next) {
    if (req.user?.role === 'admin') return next();
    return res.status(403).send({ success: false, message: "Require Admin Role" });
  }
  
  module.exports = { isModerator, isAdmin };
  