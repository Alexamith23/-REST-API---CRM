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
//Call methods tikets
const {
  tiketPost,
  tiketGet,
  tiketPatch,
  tiketDelete
} = require("../controller/tiketsController");

//Listen to the users request
router.post("/CRM/users", userPost);
router.get("/CRM/users", userGet);
router.patch("/CRM/users", userPatch);
router.delete("/CRM/users", userDelete);
router.post("/CRM/userLogin",userAutenticate);
router.delete("/CRM/logout",destroySession);

//Listen to the clientes request
router.post("/CRM/clientes", validarToken, clientPost);
router.get("/CRM/clientes",validarToken, clientGet);
router.patch("/CRM/clientes", validarToken, clientPatch);
router.delete("/CRM/clientes", validarToken,clientDelete);

//Listen to the contacts request
router.post("/CRM/contacs", validarToken,contactPost);
router.get("/CRM/contacs", validarToken,contactGet);
router.patch("/CRM/contacs", validarToken,contactPatch);
router.delete("/CRM/contacs", validarToken,contactDelete);

//Listen to the reuniones request
router.post("/CRM/reuniones",validarToken,reunionesPost);
router.get("/CRM/reuniones",validarToken,reunionesGet);
router.patch("/CRM/reuniones",validarToken,reunionesPatch);
router.delete("/CRM/reuniones",validarToken,reunionesDelete);

//Listen to the reuniones request
router.post("/CRM/tikets",validarToken,tiketPost);
router.get("/CRM/tikets",validarToken,tiketGet);
router.patch("/CRM/tikets",validarToken,tiketPatch);
router.delete("/CRM/tikets",validarToken,tiketDelete);

module.exports = router;
