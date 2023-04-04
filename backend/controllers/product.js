import {db} from "../connect.js";

export const getProducts = (req,res) =>{
    const q = `SELECT p.*, j.id AS jobId, status FROM product AS p JOIN job AS j ON (j.id = p.jobId) `

    db.query(q, (err,data) =>{
        if(err) return res.status(500)(err);
        return res.status(200).json(data);
    })
}