const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Role = require("../models/Role");
const Staff = require("../models/Staff");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../configs/keys");

const roleService = {
  /**
   * Add Admin Role and First School Admin to database
   * @param req Request to the server
   * @param res Response from the server
   */
  Create: (req, res) => {
    let mainAdmin = {
      fullname: "School Admins Setup",
      gender: "Male",
      dob: "1960-10-01",
      address: "No. 23, Opposite Blah Blah, Linus State, Computer",
      phone: 234567890123,
      email: "admin@demo.com",
      joining_date: Date.now(),
      designation: "Only God knows what it is, because me I dont know",
      description: "This is the school admin to manage all the school stuff",
      status: true,
      password: "test",
    };

    const roleName = "school_admin";
    let roleAns = "";
    Role.findOne({ name: roleName }).then((result) => {
      if (result) {
        roleAns = "Role exist already, dont re-create same role";
        mainAdmin.role = result._id;
        Staff.findOne({
          email: mainAdmin.email,
        })
          .then((result) => {
            if (result) {
              return res.status(400).json({
                success: false,
                message: "Sorry, Account is Already Created!",
                roleAns,
              });
            }

            let newStaff = new Staff(mainAdmin);
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
                newStaff.save().then((staff) => {
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
                });
              });
            });
          })
          .catch((err) =>
            res.status(500).json({
              success: false,
              message: "Error: Unable to create account",
              error: err,
            })
          );
      } else {
        let newRole = new Role({ name: roleName });

        newRole
          .save()
          .then((role) => {
            roleAns = "Role is successfuly created";
            mainAdmin.role = role.id;
            Staff.findOne({
              email: mainAdmin.email,
            })
              .then((result) => {
                if (result) {
                  return res.status(400).json({
                    success: false,
                    message: "Sorry, Account is Already Created!",
                    roleAns,
                  });
                }

                let newStaff = new Staff(mainAdmin);
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
                    newStaff.save().then((staff) => {
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
                    });
                  });
                });
              })
              .catch((err) =>
                res.status(500).json({
                  success: false,
                  message: "Error: Unable to create account",
                  error: err,
                })
              );
          })
          .catch((error) =>
            res.status(501).json({
              success: false,
              message: `Unable to add new Role`,
              error,
            })
          );
      }
    });
  },
};

module.exports = roleService;
