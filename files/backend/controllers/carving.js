const db = require("../connect.js");

const addCarving = (req, res) => {
    const q = "INSERT INTO carving (`job_id`, `side`, `position`, `first_name`, `middle_name`, `last_name`, `birth_date`, `passing_date`, `other_details`) VALUE (?)";

    const values = [
        req.params.orderid,
        req.body.car_side,
        req.body.car_position,
        req.body.car_first_name,
        req.body.car_middle_name,
        req.body.car_last_name,
        req.body.car_birth_date,
        req.body.car_passing_date,
        req.body.car_notes
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Carving Details saved");
    });
}

const getCarvings = (req, res) =>{
const q = "SELECT * FROM carving ORDER BY id DESC";
db.query(q,(err,data) =>{
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
})
}
const getCarving = (req, res) =>{
    const carvingid = req.params.carvingid;
    const q = "SELECT * FROM carving WHERE id = ?";
    db.query(q,carvingid,(err,data)=>{
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
})
    }

module.exports = {addCarving,getCarvings,getCarving};