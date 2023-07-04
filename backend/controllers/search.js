const db = require("../connect.js");

const searchCustomer = (req, res) =>{
    const { query } = req.query;
    const q = `SELECT * FROM custsomer WHERE first_name LIKE '%${query}%'`;
    db.query(q,(err, data) =>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);

    })
}

module.exports = {searchCustomer};