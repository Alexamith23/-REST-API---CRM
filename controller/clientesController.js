const Cliente = require("../model/clienteModel.js");

/**
 * Valida si la cedula que se está ingresando es válido
 * @param {cedula} cedula
 * @param {El objeto client} user
 * @param {La respuesta} res
 */
function validar_cedula_juridica(cedula, client, res) {
  Cliente.find({ ced_juridica: cedula }, function (err, cliente) {
    if (cliente.length == 0) {
      client.save(function (err) {
        if (err) {
          res.status(422);
          console.log("error while saving the client", err);
          res.json({
            error: "There was an error saving the client",
          });
        }
        res.status(201); //CREATED
        res.header({
          location: `http://localhost:3000/CRM/clientes?id=${client.id}`,
        });
        res.json(client);
      });
    } else {
      res.status(422);
      res.json({
        error:
          "EL numero de la cedula jurídica ya existe. Por favor revise los datos ingresados :(",
      });
    }
  });
}
/**
 * Crear un cliente nuevo
 * @param {*} req 
 * @param {*} res 
 */
const clientPost = (req, res) => {
  if (
    req.body.user &&
    req.body.nombre &&
    req.body.ced_juridica &&
    req.body.pagina_web &&
    req.body.direccion &&
    req.body.telefono &&
    req.body.sector
  ) {
    var client = new Cliente();
    client.user = req.body.user;
    client.nombre = req.body.nombre;
    client.ced_juridica = req.body.ced_juridica;
    client.pagina_web = req.body.pagina_web;
    client.direccion = req.body.direccion;
    client.telefono = req.body.telefono;
    client.sector = req.body.sector;
    validar_cedula_juridica(client.ced_juridica, client, res);
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
const clientGet = (req, res) => {
  // if an specific user is required
  if (req.query && req.query.id) {
    Cliente.findById(req.query.id, function (err, client) {
      if (err) {
        res.status(404);
        console.log("error while queryting the client", err);
        res.json({ error: "Client doesnt exist" });
      }
      if (!client) {
        res.json("Client doesnt exist");
        return;
      }
      res.json(client);
    });
  } else {
    // get all students
    Cliente.find(function (err, client) {
      if (err) {
        res.status(422);
        res.json({ error: err });
      }
      res.json(client);
    });
  }
};
/**
 * Edita un cliente
 * @param {*} req 
 * @param {*} res 
 */
const clientPatch = (req, res) => {
  if (req.query && req.query.id) {
    Cliente.findById(req.query.id, function (err, client) {
      if (err) {
        res.status(404);
        console.log("error while queryting the client", err);
        res.json({ error: "Client doesnt exist edit" });
      }
      // update the user object (patch)
      client.nombre = req.body.nombre ? req.body.nombre : nombre.nombre;
      client.ced_juridica = req.body.ced_juridica
        ? req.body.ced_juridica
        : client.ced_juridica;
      client.pagina_web = req.body.pagina_web
        ? req.body.pagina_web
        : client.pagina_web;
      client.direccion = req.body.direccion
        ? req.body.direccion
        : client.direccion;
      client.telefono = req.body.telefono ? req.body.telefono : client.telefono;
      client.sector = req.body.sector ? req.body.sector : client.sector;

      // update the user object (put)
      client.save(function (err) {
        if (err) {
          res.status(422);
          console.log("error while saving the client", err);
          res.json({
            error: "There was an error saving the client",
          });
        }
        res.status(200); // OK
        res.json(client);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Client doesnt exist aja" });
  }
};

/**
 * Elimina un cliente
 * @param {*} req 
 * @param {*} res 
 */
const clientDelete = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    Cliente.findById(req.query.id, function (err, client) {
      if (err) {
        res.status(500);
        console.log("error while queryting the client", err);
        res.json({ error: "client doesnt exist" });
      }
      //if the task exists
      if (client) {
        client.remove(function (err) {
          if (err) {
            res
              .status(500)
              .json({ message: "There was an error deleting the client" });
          }
          res.status(204).json({ message: "All is ok" });
        });
      } else {
        res.status(404);
        console.log("error while queryting the client", err);
        res.json({ error: "client doesnt exist" });
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a client ID" });
  }
};

module.exports = {
  clientPost,
  clientGet,
  clientPatch,
  clientDelete,
};
