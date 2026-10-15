const {EntitySchema}= require("typeorm");

module.exports = new EntitySchema({
    name:"Cuenta",
    tableName:"Cuentas",
    columns:{
        cuentaID:{type:"int", primary:true, generated:true},
        saldo:{type: "decimal", precision: 10 , scale: 2, default: 0 }
    },
    relations:{
        Usuario:{
            type:"many-to-one",
            target:"Usuario",
            joinColumn:{name:"usuarioID"},
            nullable:false
        }
    }
})