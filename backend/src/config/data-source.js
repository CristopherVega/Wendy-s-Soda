const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    synchronize: true,
    entities: [
        require("../entities/TipoComida"),
        require("../entities/UsuarioEntity"),
        require("../entities/Cuentas"),
        require("../entities/TipoCobro"),
        require("../entities/Cobro"),
        require("../entities/Registro")
    ]
});

module.exports = { AppDataSource };