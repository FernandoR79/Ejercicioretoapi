const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/db'); 

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuario', 
    timestamps: false
});

module.exports = Usuario;

//mysql://root:RhbNrBVoDvJfDweDPRYVtiqtRAevaMRD@monorail.proxy.rlwy.net:32979/railway
