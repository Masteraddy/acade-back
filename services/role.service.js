const Role = require("../models/Role");

const roleService = {
  /**
   * Get one roles from database
   * @param req Request to the server
   * @param res Response from the server
   */
  ReadOne: (req, res) => {
    Role.findById(req.params.id)
      .select("-__v")
      .then((result) => {
        if (!result)
          return res
            .status(404)
            .json({ success: false, message: "Role not found!" });
        res.status(200).json({ success: true, result });
      })
      .catch((error) =>
        res
          .status(500)
          .json({ success: false, message: `Can't get role`, error })
      );
  },

  /**
   * Get all roles from database
   * @param req Request to the server
   * @param res Response from the server
   */
  ReadAll: (req, res) => {
    Role.find({})
      .select("-__v")
      .then((result) => res.status(200).json({ success: true, result }))
      .catch((error) =>
        res
          .status(500)
          .json({ success: false, message: `Can't get roles`, error })
      );
  },

  /**
   * Add new Role to database
   * @param req Request to the server
   * @param res Response from the server
   */
  Create: (req, res) => {
    var { name } = req.body;
    Role.find({ name })
      .then((result) => {
        if (result.length >= 1) {
          res
            .status(500)
            .json({ success: false, message: `This Role already exist!` });
        }
        var newService = new Role({
          name,
        });

        newService
          .save()
          .then((data) => res.json({ success: true, result: data }))
          .catch((error) =>
            res.status(501).json({
              success: false,
              message: `Unable to add new Role`,
              error,
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
  },

  /**
   * Delete a Role from database
   * @param req Request to the server
   * @param res Response from the server
   */
  Delete: (req, res) => {
    Role.deleteOne({ _id: req.params.id })
      .then((result) => res.status(200).json({ success: true, result }))
      .catch((error) =>
        res
          .status(500)
          .json({ success: false, message: "Unable to delete Role", error })
      );
  },

  /**
   * Update a Role from database
   * @param req Request to the server
   * @param res Response from the server
   */
  Update: (req, res) => {
    let newData = req.body;
    let final = {};
    for (let key in newData) {
      if (newData[key] !== "") {
        final[key] = newData[key];
      }
    }
    Role.updateOne({ _id: req.params.id }, { $set: final })
      .then((result) => res.status(200).json({ success: true, result }))
      .catch((error) =>
        res
          .status(500)
          .json({ success: false, message: "Unable to update Role", error })
      );
  },
};

module.exports = roleService;
