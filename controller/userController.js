const User = require("../model/userModel.js");
/**
 * Valida si el usuario que se está ingresando es válido
 * @param {Nombre del usuario a validar} username
 * @param {El objeto User} user
 * @param {La respuesta} res
 */
function validar_UserName(username, user, res) {
  User.find({ usuario: username }, function (err, usere) {
    if (usere.length == 0) {
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
          location: `http://http://localhost/client/cliente?id=${user.id}`,
        });
        res.json(user);
      });
    } else {
      res.status(422);
      res.json({
        repetido: "EL nombre de usuario ya existe. Por favor ingrese otro :(",
      });
    }
  });
}

/**
 * Create new user
 * @param {*} req
 * @param {*} res
 */
const userPost = (req, res) => {
  console.log(req.query.nombre);
  console.log(req.query.apellido);
  console.log(req.query.usuario);
  console.log(req.query.clave);
  if (
    req.query.nombre &&
    req.query.apellido &&
    req.query.usuario &&
    req.query.clave
  ) {
    var user = new User();
    user.nombre = req.query.nombre;
    user.apellido = req.query.apellido;
    user.usuario = req.query.usuario;
    user.clave = req.query.clave;
    validar_UserName(user.usuario, user, res);
  } else {
    res.json({
      Message: "Por favor ingrese los datos",
    });
  }
};

/**
 * Obtengo uno o todos los usuarios
 * @param {*} req
 * @param {*} res
 */
const userGet = (req, res) => {
  // if an specific user is required
  if (req.query && req.query.id) {
    console.log("Entra aquì 1");

    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(404);
        console.log("error while queryting the user", err);
        res.json({ error: "User doesnt exist" });
      }
      if (!user) {
        res.json("User doesnt exist");
        return;
      }
      res.json(user);
    });
  } else {
    console.log("Entra aquì 2");
    // get all students
    User.find(function (err, users) {
      if (err) {
        res.status(422);
        res.json({ error: err });
      }
      res.json(users);
    });
  }
};

/**
 * Modifico todo el objeto
 * @param {*} req 
 * @param {*} res 
 */
const userPatch = (req, res) => {
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(404);
        console.log("error while queryting the user", err);
        res.json({ error: "User doesnt exist edit" });
      }
      // update the user object (patch)
      user.nombre = req.body.nombre ? req.body.nombre : nombre.nombre;
      user.apellido = req.body.apellido
        ? req.body.apellido
        : user.apellido;
      user.usuario = req.body.usuario
        ? req.body.usuario
        : user.usuario;
      user.clave = req.body.clave
        ? req.body.clave
        : user.clave;

      // update the user object (put)

      user.save(function (err) {
        if (err) {
          res.status(422);
          console.log("error while saving the user", err);
          res.json({
            error: "There was an error saving the user",
          });
        }
        res.status(200); // OK
        res.json(user);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "User doesnt exist aja" });
  }
};
/**
 * Elimino un usuario
 * @param {*} req 
 * @param {*} res 
 */
const userDelete = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(500);
        console.log("error while queryting the user", err);
        res.json({ error: "User doesnt exist" });
      }
      //if the task exists
      if (user) {
        user.remove(function (err) {
          if (err) {
            res
              .status(500)
              .json({ message: "There was an error deleting the user" });
          }
          res.status(204).json({ message: "All is ok" });
        });
      } else {
        res.status(404);
        console.log("error while queryting the user", err);
        res.json({ error: "User doesnt exist" });
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a user ID" });
  }
};

module.exports = {
  userPost,
  userGet,
  userPatch,
  userDelete,
};
