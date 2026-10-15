const {DataSource}= require('typeorm');
const Usuario= require("../entities/UsuarioEntity");
const TipoComida= require("../entities/TipoComida");
const TipoCobro= require("../entities/TipoCobro");
const Cuentas=require("../entities/Cuentas");
const Cobro=require("../entities/Cobro");
const Registro=require("../entities/Registro");


const AppDataSource= new DataSource({
    type: 'mssql',
    host: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    entities:[Usuario, TipoComida , TipoCobro, Cuentas, Cobro, Registro],
    options:{
        encrypt:false,
        trustServerCertificate: true
    },
    synchronize:false
})

module.exports={AppDataSource};