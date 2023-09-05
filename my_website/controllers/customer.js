//const { json } = require("stream/consumers");
const db = require("../connect.js");
const addCustomer = (req, res) => {

    // CHECK USER IF EXISTS

    const q = "SELECT * FROM customer WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {

        if (err) return res.status(500).json(err);

        if (data.length) return res.status(409).json([{"msg": "Customer already exists !","custid": `${data[0].id}` }]);

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
            const lastInsertId = data.insertId;

            return res.status(200).json([{"successmsg": "has been created", "lastInserId": lastInsertId }]);

        });

    });

};


const editCustomer = (req, res) => {

    const customerId = req.params.customerId;

      const q = `UPDATE customer SET first_name=?, middle_name=?, last_name=?, phone=?, address=?, notes =?  WHERE id=?`;
     

       // const q = "INSERT INTO customer (`first_name`, `middle_name`, `last_name`, `phone`, `address`, `notes`) VALUE (?)";

        const values = [

            req.body.first_name,

            req.body.middle_name,

            req.body.last_name,

            req.body.phone,

            req.body.address,

            req.body.notes,

        ];

        db.query(q, [...values, customerId], (err, data) => {
            
            if (err) return res.status(500).json(err);
            const lastInsertId = data.insertId;

            return res.status(200).json([{"successmsg": "Customer Update Successfully"}]);

        });
  };

const getCustomers = (req, res) => {
const q =  `SELECT * FROM customer ORDER BY id DESC`;
db.query(q, (err, data) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
})
}

const getSingleCustomer = (req, res) => {
    const customerId = req.params.id;
const q =  `SELECT * FROM customer WHERE id = ?`;
db.query(q,[customerId], (err, data) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
})
}

const deleteCustomer = (req, res) =>{
    const customerId = req.params.id;
    const q = "DELETE customer, job, carving, task, product FROM customer LEFT JOIN job ON job.customer_id = customer.id LEFT JOIN carving ON carving.job_id = job.id LEFT JOIN task ON task.job_id = job.id LEFT JOIN product ON product.job_id = job.id WHERE customer.id = ? OR (customer.id IS NULL AND job.id IS NULL AND carving.job_id IS NULL AND task.job_id IS NULL AND product.job_id IS NULL)";
    db.query(q, [customerId], (err, data)=>{
        if (err) return res.json(err);
        return res.json("Customer has been deleted.");
    })
}

module.exports = {getCustomers,editCustomer, addCustomer,deleteCustomer,getSingleCustomer};