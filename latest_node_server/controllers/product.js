const db = require("../connect.js");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path  = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
});

const upload = multer({ storage: storage });

const addProduct = (req, res) => {
   
    //const data = req.body

    //return res.status(200).json({data});

    /*const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
*/
let image = "";
if (req.file) {
    image = req.file.filename;
}
        const q = "INSERT INTO product (`job_id`,`description`,`color`,`size`,`options`,`quantity_on_hand`,`price`,`notes`,`image`) VALUE (?)";
        const values = [
            req.body.orderid,
            req.body.description,
            req.body.color,
            req.body.size,
            req.body.options,
            req.body.quantity_on_hand,
            req.body.price,
            req.body.notes,
            image
        ];
        
        db.query(q, [values], (err, data) => {
            if (err) {return res.status(500).json(err);}
            else {
                const lastInsertId = data.insertId;
                return res.status(200).json("Product has been created");
            }
        });


   // });
}


const updateProduct = (req, res) => {
    let image = "";
    if (req.file) {
        image = req.file.filename;
    }else{
        image = req.body.image;
    }

    const q = "UPDATE product SET `description` = ?, `color` = ?, `size` = ?, `options` = ?, `quantity_on_hand` = ?, `price` = ?, `notes` = ?, `image` = ? WHERE id = ?";
    const values = [
        req.body.description,
        req.body.color,
        req.body.size,
        req.body.options,
        req.body.qty_on_hand,
        req.body.price,
        req.body.notes,
        image,
        req.params.productId
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json("Product has been updated");
        }
    });
};


const getProducts = (req, res)  =>{
const q = "SELECT * FROM product ORDER BY id DESC";
db.query(q, (err, data) =>{
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
})
}

const getProduct = (req, res) => {
    const productId = req.params.productid;
const q =  `SELECT * FROM product WHERE id = ?`;
db.query(q,[productId], (err, data) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
})
}
const deleteProduct = (req, res)  =>{
    const productId = req.params.id;
    const q = "DELETE FROM product WHERE id = ?";
    db.query(q, [productId], (err, data)=>{
        if (err) return res.json(err);
        return res.json("Product has been deleted.");
    })
    }

module.exports = { addProduct, upload, getProducts, deleteProduct,getProduct,updateProduct };