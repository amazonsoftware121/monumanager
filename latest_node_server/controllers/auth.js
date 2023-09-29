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



const sendResetEmail = (req, res) => {
    // Generate a unique reset token (you should use a better method)
    let resetToken;

   // const saltRounds = 10; // Number of salt rounds for bcrypt hashing
    // Generate a random token (you can customize the token generation logic)
  resetToken = Math.random().toString(36).substring(7);


  // Hash the random token using bcrypt
  /*bcrypt.hash(randomToken, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing token:', err);
      return res.status(500).send('Error generating hashed token');
    }
    resetToken = hash;
    // Send the hashed token as a response
    res.json({ hashedToken: hash });
  });*/

const emailsend = req.body.email;
    const q = "INSERT INTO reset_tokens (`email`, `token`) VALUE (?)";

    const values = [
        req.body.email,
        resetToken
    ]

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error('Error storing reset token:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Create a transporter object using your Gmail account details
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'amitd.amaron@gmail.com',
                pass: 'myvhpldxfastdxbu',
                /*Nice choice of code. If this is done correcty, then theoretically it
                could be used throuout the site?*/
            },
        });

        const mailOptions = {
            from: 'admin@granitx.com',
            to: emailsend,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: http://localhost:3000/reset-password/${resetToken}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending reset email:', error);
                return res.status(500).json({ message: 'Error sending reset email' });
            }

            console.log('Reset email sent:', info.response);
            return res.json({ message: 'Reset email sent' });
        });
    });
}



module.exports = {login,logout,sendResetEmail}