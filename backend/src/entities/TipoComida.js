const {EntitySchema}= require('typeorm');

module.exports = new EntitySchema({
    name: "TipoComida",
    tableName: "TipoComida",
    columns:{
        tipoComidaID: {type: "int", primary: true, generated:true},
        nombre: {type: "varchar", length:200},
        monto: {type: "decimal", precision: 10 , scale: 2 }
    }
})