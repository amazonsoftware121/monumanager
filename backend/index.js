require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/*Connection*/

const con = mysql.createConnection(
    {
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }
)

/*Register*/

/*app.post('/register',(req,res)=>{
    const email =req.body.email;
    const username =req.body.username;
    const password = req.body.password;

    con.query("INSERT INTO users (email, username, password) VALUES(?, ?, ?)", [email, username, password],
    (err, result) =>{
        if(result){
            res.send(result);
        }
        else{
            res.send({message: "Enter correnct asked details!"})
        }
    }
    )
})*/

/* Login  */
app.post('/login',(req,res)=>{
    const username =req.body.username;
    const password = req.body.password;

    con.query("SELECT * from admin WHERE username = ? AND password =?", [username, password],
    (err, result) =>{
        if(err){
            req.setEncoding({err: err});
        }
        else{
            if(result.length == 1){
                res.send({message: "Login Successful "});
            }else{
                res.send({message:"WRONG USERNAME OR PASSWORD"});
            }
        }
    }
    )
})


app.listen(3001, ()=> {
    console.log("Backend server is running");
})