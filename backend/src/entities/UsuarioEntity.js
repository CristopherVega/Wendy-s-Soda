const {EntitySchema}= require('typeorm');

module.exports=new EntitySchema({
    name:"Usuario",
    tableName:"Usuarios",
    columns:{
        usuarioID: {type: "int", primary:true , generated:true},
        nombre: {type:"varchar", length:200}
    }
})