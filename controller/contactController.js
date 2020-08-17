const Contact = require("../model/contactModel.js");


/**
 * Crear un cliente nuevo
 * @param {*} req
 * @param {*} res
 */
const contactPost = (req, res) => {
  if (
    req.body.client &&
    req.body.nombre &&
    req.body.apellido &&
    req.body.correo &&
    req.body.telefono &&
    req.body.puesto
  ) {
    var contact = new Contact();
    contact.client = req.body.client;
    contact.nombre = req.body.nombre;
    contact.apellido = req.body.apellido;
    contact.correo = req.body.correo;
    contact.telefono = req.body.telefono;
    contact.puesto = req.body.puesto;
    contact.save(function (err) {
      if (err) {
        res.status(422);
        console.log("error while saving the contact", err);
        res.json({
          error: "There was an error saving the contact",
        });
      }
      res.status(201); //CREATED
      res.header({
        location: `http://localhost:3000/CRM/contacs?id=${contact.id}`,
      });
      res.json(contact);
    });
  } else {
    res.json({
      Message: "Por favor ingrese los datos",
    });
  }
};
/**
 * Obtine uno o todos los clientes
 * @param {*} req
 * @param {*} res
 */
const contactGet = (req, res) => {
  // if an specific user is required
  if (req.query && req.query.client_id) {
    Contact.find({ client: req.query.client_id }, function (err, contact) {
      if (err) {
        res.status(404);
        console.log("error while queryting the client", err);
        res.json({ error: "Lo siento no tiene contactos asignados" });
      }
      if (contact.length == 0) {
        res.json({ error: "Lo siento no tiene contactos asignados" });
        return;
      }
      res.json(contact);
    });
  } else {
    // get all students
    Contact.find(function (err, contact) {
      if (err) {
        res.status(422);
        res.json({ error: err });
      }
      res.json(contact);
    });
  }
};
/**
 * Edita un cliente
 * @param {*} req
 * @param {*} res
 */
const contactPatch = (req, res) => {
  if (req.query && req.query.id) {
    Contact.findById(req.query.id, function (err, contact) {
      if (err) {
        res.status(404);
        console.log("error while queryting the contact", err);
        res.json({ error: "contact doesnt exist edit" });
      }
      // update the user object (patch)
      contact.nombre = req.body.nombre ? req.body.nombre : nombre.nombre;
      contact.apellido = req.body.apellido ? req.body.apellido : contact.apellido;
      contact.telefono = req.body.telefono ? req.body.telefono : contact.telefono;
      contact.correo = req.body.correo ? req.body.correo : contact.correo;
      contact.telefono = req.body.telefono ? req.body.telefono : contact.telefono;
      contact.puesto = req.body.puesto ? req.body.puesto : contact.puesto;

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
const contactDelete = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
      
    Contact.findById(req.query.id, function (err, contact) {
      if (err) {
        res.status(500);
        console.log("error while queryting the contact", err);
        res.json({ error: "contact doesnt exist" });
      }
      //if the task exists
      if (contact) {
        contact.remove(function (err) {
          if (err) {
            res
              .status(500)
              .json({ message: "There was an error deleting the contact" });
          }
          res.status(204).json({ message: "All is ok" });
        });
      } else {
        res.status(404);
        console.log("error while queryting the contact", err);
        res.json({ error: "contact doesnt exist" });
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a contact ID" });
  }
};

module.exports = {
  contactPost,
  contactGet,
  contactPatch,
  contactDelete,
};
