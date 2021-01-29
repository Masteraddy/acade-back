const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_EXPIRES_IN, JWT_SECRET } = require('../../configs/keys');

// User Model
const Staff = require('../../models/Staff');
const Student = require('../../models/Student');

const userService = {
  /**
   * Login user to server to get token for frontend
   * @param req Request to the server
   * @param res Response from the server
   */
  loginToServer: (req, res) => {
    var { email, password } = req.body;
    var logger = email;
    if (!logger || !password) {
      return res.status(400).json({
        success: false,
        message: 'Enter All Field',
      });
    }
    Student.findOne({
      email,
    })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
              return res.status(400).json({
                success: false,
                message: 'Invalid or Wrong Password',
              });
            jwt.sign(
              {
                id: user.id,
                usertype: user.usertype,
              },
              JWT_SECRET,
              {
                expiresIn: JWT_EXPIRES_IN,
              },
              (err, token) => {
                if (err) throw err;
                res.cookie('auth-tk', token, {
                  httpOnly: true,
                  maxAge: JWT_EXPIRES_IN,
                });
                res.status(200).json({
                  success: true,
                  token,
                  result: user,
                });
              },
            );
          });
        } else {
          Staff.findOne({ email }).then((staff) => {
            if (!staff)
              return res.status(400).json({
                success: false,
                message: "User Doesn't Exist!",
              });

            bcrypt.compare(password, staff.password).then((isMatch) => {
              if (!isMatch)
                return res.status(400).json({
                  success: false,
                  message: 'Invalid or Wrong Password',
                });
              jwt.sign(
                {
                  id: staff.id,
                  usertype: staff.usertype,
                },
                JWT_SECRET,
                {
                  expiresIn: JWT_EXPIRES_IN,
                },
                (err, token) => {
                  if (err) throw err;
                  res.cookie('auth-tk', token, {
                    httpOnly: true,
                    maxAge: JWT_EXPIRES_IN,
                  });
                  res.status(200).json({
                    success: true,
                    token,
                    result: staff,
                  });
                },
              );
            });
          });
        }
      })
      .catch((err) =>
        res.status(500).json({
          success: false,
          message: 'User not found',
          error: err,
        }),
      );
  },

  /**
   * Login user to server to get token for frontend
   * @param req Request to the server
   * @param res Response from the server
   */
  getLoggedUser: (req, res) => {
    Student.findById(req.user.id)
      .select('-password')
      .then((user) => {
        if (user) {
          res.status(200).json({
            success: true,
            result: user,
          });
        } else {
          Staff.findById(req.user.id)
            .select('-password')
            .then((staff) => {
              if (!staff)
                return res.status(400).json({
                  success: false,
                  message: "User Doesn't Exist!",
                });

              res.status(200).json({
                success: true,
                result: staff,
              });
            });
        }
      })
      .catch((err) =>
        res.status(500).json({
          success: false,
          message: 'User not found',
          error: err,
        }),
      );
  },
};

module.exports = userService;
