import {db} from "../connect.js";

export const jobadd= (req, res) => {

    const q =
    "INSERT INTO `job`(`customer_id`, `product_id`, `task_id`, `status`, `notes`) VALUES (?, ?, ?, ?, ?)";

  const values = ["", "", "", "", ""];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    const jobId = data.insertId; 

    return res.status(200).json({ jobId });
  // return res.status(200).json({ jobId });
  });
};