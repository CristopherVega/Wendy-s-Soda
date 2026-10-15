const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: "Registro",
    tableName: "Registros",
    columns: {
        registroID: {type: "int", primary: true, generated: true},
        fecha: {type: "date", nullable: false},
        monto: {type: "decimal", precision: 10, scale: 2},
    },
    relations: {
        Usuario: {
            type: "many-to-one",
            target: "Usuario",
            joinColumn: {name: "usuarioID"},
            nullable: false
        },
        TipoComida: {
            type: "many-to-one",
            target: "TipoComida",
            joinColumn: {name: "tipoComidaID"},
            nullable: false
        },
        Cobro: {
            type: "many-to-one",
            target: "Cobro",
            joinColumn: {name: "cobroID"},
            nullable: false
        }
    }
})