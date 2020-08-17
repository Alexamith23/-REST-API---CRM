const Reunion = require("../model/reunionesModel.js");

/**
 * Crear una reunión nueva
 * @param {*} req
 * @param {*} res
 */
const reunionesPost = (req, res) => {
  if (
    req.body.titulo &&
    req.body.dia_hora &&
    req.body.usuario &&
    req.body.virtual
  ) {
    var reunion = new Reunion();
    reunion.titulo = req.body.titulo;
    reunion.dia_hora = req.body.dia_hora;
    reunion.usuario = req.body.usuario;
    reunion.virtual = req.body.virtual;
    reunion.save(function (err) {
      if (err) {
        res.status(422);
        console.log("error mientras se guardaba la reunión", err);
        res.json({
          error: "Ocurrió un error guardando la reunión",
        });
      }
      res.status(201); //CREATED
      res.header({
        location: `http://localhost:3000/CRM/reuniones?id=${reunion.id}`,
      });
      res.json(reunion);
    });
  } else {
    res.json({
      Message: "Por favor ingrese los datos",
    });
  }
};
/**
 * Obtine uno o todas las reuniones
 * @param {*} req
 * @param {*} res
 */
const reunionesGet = (req, res) => {
  // obtine todas las reuniones relacionadas con un usuario
  if (req.query && req.query.usuario_id) {
    Reunion.find({ usuario: req.query.usuario_id }, function (err, reunion) {
      if (err) {
        res.status(404);
        console.log("error while queryting the client", err);
        res.json({ error: "Lo siento no tiene reunion asignados" });
      }
      if (reunion.length == 0) {
        res.json({ error: "Lo siento no tiene reunion asignados" });
        return;
      }
      res.json(reunion);
    });
  } else if (req.query && req.query._id) {
    // obtiene uno en especifico con el id de la reunion
    Reunion.findById(req.query._id, function (err, reunion) {
      if (err) {
        res.status(422);
        res.json({ error: err });
      }
      if (reunion.length == 0) {
        res.json({ error: "Lo siento no tiene reunion asignados" });
        return;
      }
      res.json(reunion);
    });
  } else {
    res.json({ error: "Por favor ingrese los datos" });
  }
};
// /**
//  * Edita un cliente
//  * @param {*} req
//  * @param {*} res
//  */
const reunionesPatch = (req, res) => {
  if (req.query && req.query.id) {
    Reunion.findById(req.query.id, function (err, contact) {
      if (err) {
        res.status(404);
        console.log("error while queryting the contact", err);
        res.json({ error: "contact doesnt exist edit" });
      }
      // update the user object (patch)
      contact.titulo = req.body.titulo ? req.body.titulo : contact.titulo;
      contact.dia_hora = req.body.dia_hora
        ? req.body.dia_hora
        : contact.dia_hora;

      contact.virtual = req.body.virtual
        ? req.body.virtual
        : contact.virtual;

      // update the user object (put)
      contact.save(function (err) {
        if (err) {
          res.status(422);
          console.log("error while saving the contact", err);
          res.json({
            error: "There was an error saving the contact",
          });
        }
        res.status(200); // OK
        res.json(contact);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Contact doesnt exist aja" });
  }
};

/**
 * Elimina un cliente
 * @param {*} req
 * @param {*} res
 */
const reunionesDelete = (req, res) => {
  if (req.query && req.query.id) {

    Reunion.findById(req.query.id, function (err, reunion) {
      if (err) {
        res.status(500);
        console.log("error while queryting the reunion", err);
        res.json({ error: "reunion doesnt exist" });
      }
      //if the task exists
      if (reunion) {
        reunion.remove(function (err) {
          if (err) {
            res
              .status(500)
              .json({ message: "There was an error deleting the reunion" });
          }
          res.status(204).json({ message: "All is ok" });
        });
      } else {
        res.status(404);
        console.log("error while queryting the reunion", err);
        res.json({ error: "reunion doesnt exist" });
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a reunion ID" });
  }
};

module.exports = {
  reunionesPost,
  reunionesGet,
  reunionesPatch,
  reunionesDelete,
};
