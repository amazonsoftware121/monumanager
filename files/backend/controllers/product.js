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
let product_image = "";
if (req.file) {
    product_image = req.file.filename;
}


        const q = "INSERT INTO product (`job_id`,`description`,`color`,`size`,`options`,`quantity_on_hand`,`price`,`notes`,`image`) VALUE (?)";
        const values = [
            req.params.orderid,
            req.body.product_description,
            req.body.product_color,
            req.body.product_size,
            req.body.product_options,
            req.body.product_qty_on_hand,
            req.body.product_price,
            req.body.product_notes,
            product_image
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
    let product_image = "";
    if (req.file) {
        product_image = req.file.filename;
    }

    const q = "UPDATE product SET `description` = ?, `color` = ?, `size` = ?, `options` = ?, `quantity_on_hand` = ?, `price` = ?, `notes` = ?, `image` = ? WHERE id = ?";
    const values = [
        req.body.product_description,
        req.body.product_color,
        req.body.product_size,
        req.body.product_options,
        req.body.product_qty_on_hand,
        req.body.product_price,
        req.body.product_notes,
        product_image,
        req.params.productid
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