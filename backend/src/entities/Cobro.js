const {EntitySchema}=require('typeorm');

module.exports=new EntitySchema({
    name:"Cobro",
    tableName:"Cobros",
    columns:{
        cobroID:{type:"int", primary:true, generated:true},
        fechaInicio:{type:"date", nullable:false},
        fechaFin:{type:"date", nullable:false},
        montoTotal:{type: "decimal", precision: 10 , scale: 2 },
        estado:{type:"varchar", length:20}
    },
    relations:{
        Cuenta:{
            type:"many-to-one",
            target:"Cuentas",
            joinColumn:{name: "cuentaID"},
            nullable:false
        },
        TipoCobro:{
            type:"many-to-one",
            target:"TipoCobro",
            joinColumn:{name: "tipoCobroID"},
            nullable:false
        }
    }
})