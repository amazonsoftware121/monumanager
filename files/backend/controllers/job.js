const db = require("../connect.js");


const addJob = (req, res) => {
  const q =
    "INSERT INTO `job`(`customer_id`,`notes`) VALUES (?)";
  const values = [
    req.body.currentCustomerid,
    req.body.order_notes
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    const lastInsertId = data.insertId;
    return res.status(200).json([{ "successmsg": "Order has been created", "lastInserId": lastInsertId }]);
  });
};



const getJobs = (req, res) => {
  const q = `SELECT * FROM job ORDER BY id DESC`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
};

const getJob = (req, res) => {
  const jobId = req.params.id;
  const q = `SELECT * FROM job WHERE id = ?`;
  db.query(q, [jobId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
};

const recentJobs = (req, res) => {
  const custId = req.body.customerId;
  const q = "SELECT * FROM job WHERE customer_id = ?";
  db.query(q, [custId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ data });
    // return res.status(200).json({ jobId });
  });
};

const updateJob = (req, res) => {

}


const jobDetails = (req, res) => {
  const custId = req.params.id;
  const q = `SELECT id, description, 'product' AS type  FROM product WHERE job_id = ${custId} UNION SELECT id, description,'task' AS type FROM task WHERE job_id = ${custId} UNION SELECT id, last_name,'carving' AS type FROM carving WHERE job_id = ${custId}`;
  db.query(q, [custId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}




const updateJobStatus = (req, res) => {
  const q =
    "UPDATE job SET status = ? WHERE id = ?";
  const values = [
    req.body.order_status,
    req.params.orderid,
  ];
  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Status Updated");
  });

}


const deleteJob = (req, res) => {
  const jobId = req.params.id;
  const q = "DELETE job, carving, task, product FROM job LEFT JOIN carving ON carving.job_id = job.id LEFT JOIN task ON task.job_id = job.id LEFT JOIN product ON product.job_id = job.id WHERE job.id = ? OR (job.id IS NULL AND carving.job_id IS NULL AND task.job_id IS NULL AND product.job_id IS NULL);";

  db.query(q, [jobId], (err, data)=>{
    if (err) return res.json(err);
    return res.json("Job has been deleted.");
})

}


module.exports = { addJob, getJobs, getJob, updateJob, recentJobs, updateJobStatus, jobDetails,deleteJob };