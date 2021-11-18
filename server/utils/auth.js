const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = process.env.JWT_SECRET || "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.query?.token || req.headers?.authorization;

    if (req.headers?.authorization) {
      token = token.split(" ").pop().trim();
    }

    // verify token and get user data out of it
    if (token) {
      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch {
        console.log("Invalid token");
      }
    }

    return req;
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
