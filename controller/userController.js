const User = require("../model/userModel.js");

/**
 * Create new user
 * @param {*} req
 * @param {*} res
 */
const userPost = (req, res) => {
  if (req.body.nombre &&req.body.apellido &&req.body.usuario &&req.body.clave
  ) {
    var user = new User();
    user.nombre = req.body.nombre;
    user.apellido = req.body.apellido;
    user.usuario = req.body.usuario;
    user.clave = req.body.clave;
    user.save(function (err) {
      if (err) {
        res.status(422);
        console.log("error while saving the student", err);
        res.json({
          error: "There was an error saving the user",
        });
      }
      res.status(201); //CREATED
      res.header({
        location: `http://localhost:3000/CRM/users?id=${user.id}`,
      });
      res.json(user);
    });
  } else {
    res.json({
      Message: "Por favor ingrese los datos",
    });
  }
};
const userGet = (req, res) => {
  res.status(200); //Todo bien
  res.json({
    Message: "Get a user",
  });
};
const usersGet = (req, res) => {
  res.status(201); //Todo bien
  res.json({
    Message: "Many users",
  });
};
const userPatch = (req, res) => {
  res.status(201); //Todo bien
  res.json({
    Message: "Edit a user",
  });
};
const userDelete = (req, res) => {
  res.status(204); //Todo bien
  res.json({
    Message: "Delete a user",
  });
};

module.exports = {
  userPost,
  userGet,
  usersGet,
  userPatch,
  userDelete,
};
