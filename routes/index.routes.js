const { Router } = require("express");
const router = Router();

//Call methods user
const {
  userPost,
  userGet,
  userPatch,
  userDelete,
  userAutenticate,
  validarToken,
  destroySession
} = require("../controller/userController.js");

//Call methods clientes
const {
  clientPost,
  clientGet,
  clientPatch,
  clientDelete
} = require("../controller/clientesController.js");

//Call methods contactos
const {
  contactPost,
  contactGet,
  contactPatch,
  contactDelete,
} = require("../controller/contactController.js");
//Call methods reuniones
const {
  reunionesPost,
  reunionesGet,
  reunionesPatch,
  reunionesDelete,
} = require("../controller/reunionesController");

//Listen to the users request
router.post("/CRM/users", userPost);
router.get("/CRM/users", userGet);
router.patch("/CRM/users", userPatch);
router.delete("/CRM/users", userDelete);
router.post("/CRM/userLogin",userAutenticate);
router.delete("/CRM/logout",destroySession);

//Listen to the clientes request
router.post("/CRM/clientes", clientPost);
router.get("/CRM/clientes",validarToken, clientGet);
router.patch("/CRM/clientes", clientPatch);
router.delete("/CRM/clientes", clientDelete);

//Listen to the contacts request
router.post("/CRM/contacs", contactPost);
router.get("/CRM/contacs", contactGet);
router.patch("/CRM/contacs", contactPatch);
router.delete("/CRM/contacs", contactDelete);

//Listen to the reuniones request
router.post("/CRM/reuniones",reunionesPost);
router.get("/CRM/reuniones",reunionesGet);
router.patch("/CRM/reuniones",reunionesPatch);
router.delete("/CRM/reuniones",reunionesDelete);

module.exports = router;
