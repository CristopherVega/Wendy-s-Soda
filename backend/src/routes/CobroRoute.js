const express= require('express');
const controller=require("../controller/CobrosController");
const router=express.Router();

router.get("/", controller.listar);
router.post("/", controller.crear);
router.patch("/:id/pagar", controller.pagar);
router.delete("/:id", controller.eliminar);

module.exports= router;