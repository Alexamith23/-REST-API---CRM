const Reunion = require("../model/reunionesModel.js");

/**
 * Crear una reunión nueva
 * @param {*} req
 * @param {*} res
 */
const reunionesPost = (req, res) => {
  if (
    req.query.titulo &&
    req.query.fecha &&
    req.query.hora &&
    req.query.usuario &&
    req.query.virtual&&
    req.query.cliente 
  ) {
    var reunion = new Reunion();
    reunion.titulo = req.query.titulo;
    reunion.dia_hora = req.query.fecha;
    reunion.hora = req.query.hora;
    reunion.usuario = req.query.usuario;
    reunion.virtual = req.query.virtual;
    reunion.cliente = req.query.cliente;
    reunion.usuario_id = req.query.id_user;
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
      res.json({meet:reunion});
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
  // if an specific user is required
  if (req.query && req.query.id) {
    Reunion.findById(req.query.id, function (err, contact) {
        res.json(contact);
    });
  }
  else if (req.query && req.query.id_user) {
    console.log("Entra aquiii");
    Reunion.find({ usuario_id: req.query.id_user }, function (err, contact) {
      console.log(contact);
      if (err) {
        res.status(404);
        console.log("error while queryting the client", err);
        res.json({ vacio: "Lo siento no tiene contactos asignados" });
      }
      if (contact.length == 0) {
        res.json({ vacio: "Lo siento no tiene contactos asignados" });
        return;
      }else{
        res.json({meet:contact});
      }
      
    });
  } 
};
// /**
//  * Edita un cliente
//  * @param {*} req
//  * @param {*} res
//  */
const reunionesPatch = (req, res) => {
  console.log("Entraaaaaaaaaaaaaaa"+req.query.id);
  if (req.query && req.query.id) {
    Reunion.findById(req.query.id, function (err, meet) {
      if (err) {
        res.status(404);
        console.log("error while queryting the meet", err);
        res.json({ error: "Meet doesnt exist edit" });
      }
      // update the user object (patch)
      meet.titulo = req.query.titulo ? req.query.titulo : meet.titulo;
      meet.dia_hora = req.query.fecha ? req.query.fecha : meet.dia_hora;
      meet.hora = req.query.hora ? req.query.hora : meet.hora;
      meet.virtual = req.query.virtual ? req.query.virtual : meet.virtual;
      meet.cliente = req.query.cliente ? req.query.cliente : meet.cliente;
      meet.usuario = req.query.usuario ? req.query.usuario : meet.usuario;
      // update the user object (put)
      meet.save(function (err) {
        if (err) {
          res.status(422);
          console.log("error while saving the contact", err);
          res.json({
            error: "There was an error saving the contact",
          });
        }
        res.status(200); // OK
        res.json(meet);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Meet doesnt exist" });
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
