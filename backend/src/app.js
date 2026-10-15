const express= require("express");
const cors= require("cors");
const path= require("path");

const usuariosRoutes= require("./routes/UsuarioRoute");
const comidaRoutes= require("./routes/TipoComidaRoute");
const tipoCobrosRoutes=require("./routes/TipoCobroRoute");
const cuentaRoutes=require("./routes/CuentaRoute");
const cobrosRoutes=require("./routes/CobroRoute");
const registroRoutes=require("./routes/RegistroRoute");

const app= express();

app.use(cors());
app.use(express.json());

app.get("/", function(req, res) {
    res.json({ mensaje: "API funcionando" });
});

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/comida", comidaRoutes);
app.use("/api/tipoCobros", tipoCobrosRoutes);
app.use("/api/cuentas", cuentaRoutes);
app.use("/api/cobros", cobrosRoutes);
app.use("/api/registros", registroRoutes);

app.use(function(req, res) {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
});


app.use(function(error, req, res) {
    console.error(error);
    res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
});

module.exports = app;