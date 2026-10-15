const express= require("express");
const controller=require("../controller/TipoComidaController");
const router= express.Router();

router.get("/" , controller.listar);
router.post("/" , controller.crear);
router.put("/:id" , controller.editar);
router.delete("/:id" , controller.eliminar);

module.exports= router;