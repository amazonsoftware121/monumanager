const express = require("express");
const  {addJob,getJobs,getJob,updateJob,recentJobs,updateJobStatus,jobDetails, deleteJob} = require("../controllers/job.js");

const router = express.Router();

router.post("/addjob", addJob);
router.get("/getjobs", getJobs);
router.get("/getjob/:id", getJob);
router.post("/recentjobs", recentJobs);
router.put("/updatejob/:orderid", updateJob);
router.put("/updatejobstatus/:orderid", updateJobStatus);
router.get("/jobdetails/:id", jobDetails);
router.delete("/deletejob/:id", deleteJob);

//router.delete("/updatejobstatus/:id", updateJobStatus);

module.exports = router;