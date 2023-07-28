const db = require("../connect.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");




/*To Register Admin User Start*/
/*
export const register = (req,res) =>{
const q = "SELECT * FROM admin WHERE username = ?";

db.query(q,[req.body.username], (err,data)=>{
    if(err) return res.status (500).json(err);
    if(data.length) return res.status(409).json("Admin already exists !");


const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(req.body.password, salt)

const q = "INSERT INTO admin (`email`, `username`, `password`) VALUE (?)";

const values = [
    req.body.email,
    req.body.username,
    hashedPassword
];
db.query(q, [values], (err,data) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json("User has been created.");
});
});
};

*/
/*To Register Admin User End*/





const login = (req, res) =>{
   const q = "SELECT * FROM admin WHERE username = ?"

    db.query(q, [req.body.username], (err,data) =>{
        if (err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("User not found");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

        if(!checkPassword) return res.status(400).json("Wrong password or username!");

        const token = jwt.sign({id:data[0].id}, "secretkey");

        const { password, ...others } = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        })
        .status(200).json(others);

    });
};

const logout = (req, res) =>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out.")
};

module.exports = {login,logout}