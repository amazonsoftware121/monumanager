const mysql = require("mysql");
const {} = require("dotenv/config.js");

const db = mysql.createConnection({
 
  /*
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
*/
host:"localhost",
user: "root",
password:"",
database:"monumanager"

})



db.connect((error)=>{
    if(error) throw error
    console.log('Database connected successfuly');
})

module.exports = db;