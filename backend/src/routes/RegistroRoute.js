const express= require('express');
const controller= require("../controller/RegistroController");
const route= express.Router();

route.get("/", controller.listar);
route.post("/", controller.crear);
route.delete("/:id", controller.eliminar);
route.put("/:id", controller.editar);

module.exports= route;