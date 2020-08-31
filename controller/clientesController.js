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
        error:"EL numero de la cedula jurídica ya existe. Por favor revise los datos ingresados :(",
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
  console.log("A quien pertenece este cliente "+req.query.id_user);
  if (
    req.query &&
    req.query.id_user &&
    req.query.nombre &&
    req.query.ced_juridica &&
    req.query.pagina_web &&
    req.query.direccion &&
    req.query.telefono &&
    req.query.sector
  ) {
    var client = new Cliente();
    client.user = req.query.id_user;
    client.nombre = req.query.nombre;
    client.ced_juridica = req.query.ced_juridica;
    client.pagina_web = req.query.pagina_web;
    client.direccion = req.query.direccion;
    client.telefono = req.query.telefono;
    client.sector = req.query.sector;
    validar_cedula_juridica(client.ced_juridica, client, res);
  } else {
    res.json({
      vacio: "Por favor ingrese los datos",
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
      if (client) {
        console.log(client);
        res.send(client);
        // res.json(client);
        return;
      }else{
        console.log("No esta");
        res.json({ no_clientes: "Por el momento no tiene clientes registrados" });
      }
    });
  } else if(req.query && req.query.id_user){
      Cliente.find({user:req.query.id_user}, function (err, client) {
        if (err) {
          res.status(404);
          console.log("error while queryting the client", err);
          res.json({ error: "Client doesnt exist" });
        }
        if (client.length > 0) {
          console.log(client);
          res.json({ clientes: client});
          return;
        }else{
          res.json({ no_clientes: "Por el momento no tiene clientes registrados" });
        }
      });
  }else {
    // get all clientes
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
        res.json({ error: "El cliente no existe" });
      }
      console.log("Entra");
      // update the user object (patch)
      client.nombre = req.query.nombre ? req.query.nombre : nombre.nombre;
      client.ced_juridica = req.query.ced_juridica
        ? req.query.ced_juridica
        : client.ced_juridica;
      client.pagina_web = req.query.pagina_web
        ? req.query.pagina_web
        : client.pagina_web;
      client.direccion = req.query.direccion
        ? req.query.direccion
        : client.direccion;
      client.telefono = req.query.telefono ? req.query.telefono : client.telefono;
      client.sector = req.query.sector ? req.query.sector : client.sector;

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
        res.json({editado: "Se editó con exito"});
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
        res.json({ error: "El cliente no existe" });
      }
      //if the task exists
      if (client) {
        client.remove(function (err) {
          if (err) {
            res
              .status(500)
              .json({ error: "Ocurrió un error borrando el cliente" });
          }else{
          res.status(204).json({ message: "All is ok" });
        }
        });
      } else {
        res.status(404);
        console.log("error while queryting the client", err);
        res.json({ error: "El cliente no existe" });
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
  clientDelete
};
