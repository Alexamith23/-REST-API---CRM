const Contact = require("../model/contactModel.js");


/**
 * Crear un cliente nuevo
 * @param {*} req
 * @param {*} res
 */
const contactPost = (req, res) => {
  if (
    req.query.client &&
    req.query.nombre &&
    req.query.apellido &&
    req.query.correo &&
    req.query.telefono &&
    req.query.puesto
  ) {
    var contact = new Contact();
    contact.client = req.query.client;
    contact.nombre = req.query.nombre;
    contact.apellido = req.query.apellido;
    contact.correo = req.query.correo;
    contact.telefono = req.query.telefono;
    contact.puesto = req.query.puesto;
    contact.usuario_id = req.query.id_user;
    contact.save(function (err) {
      if (err) {
        res.status(422);
        console.log("error while saving the contact", err);
        res.json({
          error: "There was an error saving the contact",
        });
      }else{
        res.status(201); //CREATED
      res.header({
        location: `http://localhost:3000/CRM/contacs?id=${contact.id}`,
      });
      res.json(contact);
      }
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
  if (req.query && req.query.id) {
    Contact.findById(req.query.id, function (err, contact) {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        res.json(contact);
    });
  }else if (req.query && req.query.id_user) {
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx2");
    Contact.find({ usuario_id: req.query.id_user }, function (err, contact) {
      if (err) {
        res.status(404);
        console.log("error while queryting the client", err);
        res.json({ vacio: "Lo siento no tiene contactos asignados" });
      }
      if (contact === null) {
        res.json({ vacio: "Lo siento no tiene contactos asignados" });
        return;
      }else{
        res.json({contactos:contact});
      }
      
    });
  } 
};
/**
 * Edita un cliente
 * @param {*} req
 * @param {*} res
 */
const contactPatch = (req, res) => {
  console.log("Holaaaaaaaaaaaaaaaaa" +req.query.id);
  if (req.query && req.query.id) {
    Contact.findById(req.query.id, function (err, contact) {
      if (err) {
        res.status(404);
        console.log("error while queryting the contact", err);
        res.json({ error: "contact doesnt exist edit" });
      }
      // update the user object (patch)
      contact.client = req.query.client ? req.query.client : client.client;
      contact.nombre = req.query.nombre ? req.query.nombre : nombre.nombre;
      contact.apellido = req.query.apellido ? req.query.apellido : contact.apellido;
      contact.telefono = req.query.telefono ? req.query.telefono : contact.telefono;
      contact.correo = req.query.correo ? req.query.correo : contact.correo;
      contact.telefono = req.query.telefono ? req.query.telefono : contact.telefono;
      contact.puesto = req.query.puesto ? req.query.puesto : contact.puesto;

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
    console.log("no lo encuentra");
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
        console.log("error while queryting the contact 1", err);
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
        console.log("error while queryting the contact 2", err);
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
