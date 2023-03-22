import {db} from "../connect.js";
//import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const register = (req, res) =>{
// CHECK USER IF EXISTS

const q = "SELECT * FROM customer WHERE email = ?";

db.query(q,[req.body.email],(err,data)=>{
    if(err) return res.status(500).json(err)
    if(data.length) return res.status(409).json("Customer already exists !")


//CREATE A NEW USER
// Hash the password

/*const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(req.body.hashedPassword, salt)*/

const q = "INSERT INTO `customer`(`first_name`, `middle_name`, `last_name`, `phone`, `email`, `address`, `notes`) VALUE (?)";

const values = [req.body.first_name,req.body.middle_name,req.body.last_name,req.body.phone,req.body.email,req.body.address,req.body.notes]
db.query(q,[values], (err,data) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json("User has been created.");
})
})
};

export const login = (req, res) =>{
    const q = "SELECT * FROM admin WHERE = ?"

    db.query(q, [req.body.username], (err,data) =>{
        if (err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("User not found");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword) return res.status(400).json("Wrong password or username!")

        const token = jwt.sign({id:data[0].id}, "secretkey");

        const { password, ...others } = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        })
        .status(200).json(others);

    })
}

export const logout = (req, res) =>{
    
}