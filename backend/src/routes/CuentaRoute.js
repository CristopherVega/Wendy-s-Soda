const express= require('express');
const controller=require("../controller/CuentasController");
const router= express.Router();

router.get("/", controller.listar);
router.post("/", controller.crear);
router.delete("/:id", controller.eliminar);

module.exports= router;