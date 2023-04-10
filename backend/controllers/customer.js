const db = require("../connect.js");
const addCustomer = (req, res) => {
    // CHECK USER IF EXISTS

    const q = "SELECT * FROM customer WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("Customer already exists !");
        const q = "INSERT INTO customer (`first_name`, `middle_name`, `last_name`, `phone`, `email`, `address`, `notes`) VALUE (?)";
        const values = [
            req.body.first_name,
            req.body.middle_name,
            req.body.last_name,
            req.body.phone,
            req.body.email,
            req.body.address,
            req.body.notes,
        ];
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });
};



const updateCustomer = (req, res) => {
    // CHECK USER IF EXISTS

  
};


const viewCustomer = () => {
    
}

module.exports = {viewCustomer,updateCustomer, addCustomer};