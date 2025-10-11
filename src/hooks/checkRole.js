const checkRole = (role) => (req, res, next) => {
  if (req.user) {
    if (req.user.role === role) {
      next();
    } else {
      res.status(403).send({
        success: false,
        message: "You are not permitted to view",
      });
    }
  } else {
    res.status(401).send({
      success: false,
      message: "Please login to view data",
    });
  }
};

module.exports = { checkRole };
