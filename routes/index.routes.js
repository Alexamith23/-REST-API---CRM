const { Router } = require("express");
const router = Router();

//Call methods user
const {
  userPost,
  userGet,
  userPatch,
  userDelete,
} = require("../controller/userController.js");

//Call methods user
const {
  clientPost,
  clientGet,
  clientPatch,
  clientDelete,
} = require("../controller/clientesController.js");

//Call methods user
const {
  contactPost,
  contactGet,
  contactPatch,
  contactDelete,
} = require("../controller/contactController.js");

//Listen to the users request
router.post("/CRM/users", userPost);
router.get("/CRM/users", userGet);
router.patch("/CRM/users", userPatch);
router.delete("/CRM/users", userDelete);

//Listen to the clientes request
router.post("/CRM/clientes", clientPost);
router.get("/CRM/clientes", clientGet);
router.patch("/CRM/clientes", clientPatch);
router.delete("/CRM/clientes", clientDelete);

//Listen to the contacts request
router.post("/CRM/contacs", contactPost);
router.get("/CRM/contacs", contactGet);
router.patch("/CRM/contacs", contactPatch);
router.delete("/CRM/contacs", contactDelete);

module.exports = router;
