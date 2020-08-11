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

module.exports = router;
