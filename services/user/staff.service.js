const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Role = require("../../models/Role");
const Staff = require("../../models/Staff");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../configs/keys");

const staffService = {
  /**
   * Add a new Staff to database
   * @param req Request to the server
   * @param res Response from the server
   */
  Create: (req, res) => {
    let {
      fullname,
      gender,
      dob,
      address,
      phone,
      email,
      joining_date,
      designation,
      role,
      description,
      status,
      password,
    } = req.body;

    Staff.findOne({
      email,
    })
      .then((result) => {
        if (result) {
          return res.status(400).json({
            success: false,
            message: "Email is already been used!",
          });
        }

        let newStaff = new Staff({
          fullname,
          gender,
          dob,
          address,
          phone,
          email,
          joining_date,
          designation,
          role,
          description,
          status,
          password,
        });
        // Create Salt and Hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newStaff.password, salt, (err, hash) => {
            if (err)
              return res.status(500).json({
                success: false,
                message: "Error: Unable to create account",
                error: err,
              });
            newStaff.password = hash;
            newStaff
              .save()
              .then((staff) => {
                jwt.sign(
                  {
                    id: staff.id,
                    //   usertype: staff.usertype,
                  },
                  (jwtSecret = JWT_SECRET),
                  {
                    expiresIn: JWT_EXPIRES_IN,
                  },
                  (err, token) => {
                    if (err) throw err;
                    res.status(201).json({
                      token,
                      result: staff,
                      success: true,
                    });
                  }
                );
              })
              .catch((error) =>
                res.status(500).json({
                  success: false,
                  message: "Error: Unable to create account",
                  error,
                })
              );
          });
        });
      })
      .catch((error) =>
        res.status(500).json({
          success: false,
          message: "Error: Unable to create account",
          error,
        })
      );
  },

  /**
   * Get one roles from database
   * @param req Request to the server
   * @param res Response from the server
   */
  ReadAll: (req, res) => {
    Staff.find({})
      .then((result) => {
        return res.status(200).json({ success: true, result });
      })
      .catch((error) =>
        res
          .status(500)
          .json({ success: false, message: "Unable to fetch Staffs", error })
      );
  },
};

module.exports = staffService;
