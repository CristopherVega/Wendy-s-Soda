const {EntitySchema}=require("typeorm");

module.exports = new EntitySchema ({
    name:"TipoCobro",
    tableName:"TipoCobro",
    columns:{
        tipoCobroID:{type:"int", primary:true, generated:true},
        nombre:{type:"varchar", length:200},
        diasIntervalo:{type:"int"}
    }
})