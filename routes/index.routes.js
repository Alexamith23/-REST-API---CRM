const { Router } = require("express");
const router = Router();

//Call methods user
const {
    userPost,
    userGet,
    userPatch,
    userDelete
  } = require("../controller/userController.js");

//Listen to the users request
router.post("/CRM/users", userPost);
router.get("/CRM/users", userGet);
router.patch("/CRM/users", userPatch);
router.delete("/CRM/users", userDelete);


module.exports = router;