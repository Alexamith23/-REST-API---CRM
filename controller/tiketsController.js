const Tiket = require("../model/tiketModel.js");

/**
 * Crear una reunión nueva
 * @param {*} req
 * @param {*} res
 */
const tiketPost = (req, res) => {
  if (
    req.query.titulo &&
    req.query.detalle &&
    req.query.reporta &&
    req.query.cliente &&
    req.query.estado
  ) {
    var tiket = new Tiket();
    tiket.titulo = req.query.titulo;
    tiket.detalle = req.query.detalle;
    tiket.reporta = req.query.reporta;
    tiket.cliente = req.query.cliente;
    tiket.estado = req.query.estado;
    tiket.usuario_id = req.query.id_user;
    tiket.save(function (err) {
      if (err) {
        res.status(422);
        console.log("error mientras se guardaba el tiket", err);
        res.json({
          error: "Ocurrió un error guardando la tiket",
        });
      }
      res.status(201); //CREATED
      res.header({
        location: `http://localhost:3000/CRM/tikets?id=${tiket.id}`,
      });
      res.json({supportTiket:tiket});
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
const tiketGet = (req, res) => {
  // if an specific user is required
  if (req.query && req.query.id) {
    Tiket.findById(req.query.id, function (err, tiket) {
        res.json(tiket);
    });
  }
  else if (req.query && req.query.id_user) {
    console.log(req.query.id_user);
    Tiket.find({ usuario_id: req.query.id_user }, function (err, tiket) {
      console.log(tiket);
      if (err) {
        res.status(404);
        console.log("error while queryting the client", err);
        res.json({ vacio: "Lo siento no tiene tikets asignados" });
      }
      if (tiket.length == 0) {
        res.json({ vacio: "Lo siento no tiene tikets asignados" });
        return;
      }else{
        res.json({supportTiket:tiket});
      }
      
    });
  } 
};
// /**
//  * Edita un cliente
//  * @param {*} req
//  * @param {*} res
//  */
const tiketPatch = (req, res) => {
  console.log("Entraaaaaaaaaaaaaaa "+req.query.id);
  if (req.query && req.query.id) {
    Tiket.findById(req.query.id, function (err, tiket) {
      if (err) {
        res.status(404);
        console.log("error while queryting the tiket", err);
        res.json({ error: "tiket doesnt exist edit 1" });
      }
      // update the user object (patch)
      tiket.titulo = req.query.titulo ? req.query.titulo : tiket.titulo;
      tiket.detalle = req.query.detalle ? req.query.detalle : tiket.detalle;
      tiket.reporta = req.query.reporta ? req.query.reporta : tiket.reporta;
      tiket.cliente = req.query.cliente ? req.query.cliente : tiket.cliente;
      tiket.estado = req.query.estado ? req.query.estado : tiket.estado;
      // update the user object (put)
      tiket.save(function (err) {
        if (err) {
          res.status(422);
          console.log("error while saving the tiket", err);
          res.json({
            error: "There was an error saving the tiket",
          });
        }
        res.status(200); // OK
        res.json(tiket);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Tiket doesnt exist 2" });
  }
};

/**
 * Elimina un cliente
 * @param {*} req
 * @param {*} res
 */
const tiketDelete = (req, res) => {
  if (req.query && req.query.id) {

    Tiket.findById(req.query.id, function (err, tiket) {
      if (err) {
        res.status(500);
        console.log("error while queryting the tiket", err);
        res.json({ error: "tiket doesnt exist" });
      }
      //if the task exists
      if (tiket) {
        tiket.remove(function (err) {
          if (err) {
            res
              .status(500)
              .json({ message: "There was an error deleting the tiket" });
          }
          res.status(204).json({ message: "All is ok" });
        });
      } else {
        res.status(404);
        console.log("error while queryting the tiket", err);
        res.json({ error: "tiket doesnt exist" });
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a tiket ID" });
  }
};

module.exports = {
  tiketPost,
  tiketGet,
  tiketPatch,
  tiketDelete,
};
