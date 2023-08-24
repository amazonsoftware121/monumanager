const db = require("../connect.js");
// would be nice to search through the different tables outside of just the customers
const searchCustomer = (req, res) =>{
    const { query } = req.query;
    const q = `SELECT * FROM custsomer WHERE first_name LIKE '%${query}%'`;
    db.query(q,(err, data) =>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);

    })
}

module.exports = {searchCustomer};