const Sequelize = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + '/users.db'
})


//////---------------FOR USERS TABLE----------------/////
const Users = db.define('user', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.DataTypes.STRING(30),
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.DataTypes.STRING(100),
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
})

///////----------------for URL-------------------///

const URL = db.define('url', {
   
    hash: {
      type: Sequelize.DataTypes.STRING(16),
      primaryKey: true
    },
    userid: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull : false,
      autoIncrement : true
    },
    originalURL: {
      type: Sequelize.DataTypes.STRING(512),
      allowNull: false
    },
    creationdate: {
      type: 'TIMESTAMP',
    }
   
  })
  


//db.authenticate();  ////--for testing 
module.exports = {
  db, Users , URL
}