const {Sequelize} = require('sequelize')
require("dotenv").config();

/*const sequelize = new Sequelize('usuario', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})*/

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 60000
    }
})

const connectDB = async() =>{
    try {
        await sequelize.authenticate()
        console.log('connected to database')
    } catch(err){
        console.error('Error connecting to database', err)

    }
    
}

module.exports = {sequelize,connectDB}

