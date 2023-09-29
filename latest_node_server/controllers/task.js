const db = require("../connect.js");

const addTask = (req, res) =>{
    const q = "INSERT INTO task (`job_id`, `description`, `creation_time`, `due_date`, `notes`) VALUE (?)";

    const values = [
        req.params.orderid,    
        req.body.task_description,
        req.body.task_creation_date,
        req.body.task_due_date,
        req.body.task_notes
    ];

    db.query(q, [values] , (err, data) =>{
        if(err) return res.status(500).json(err);
            const lastInsertId = data.insertId;
            return res.status(200).json([{"successmsg": "Task has been Created", "lastInserId": lastInsertId }]);        
    });
}


const editTask = (req, res) => {
    const taskId = req.params.taskId; // Assuming taskId is the unique identifier for the task
    const q = "UPDATE task SET `description` = ?, `creation_time` = ?, `due_date` = ?, `notes` = ? WHERE `id` = ?";

    const values = [
        req.body.task_description,
        req.body.task_creation_date,
        req.body.task_due_date,
        req.body.task_notes,
        taskId // Use taskId to identify the task to update
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json([{"successmsg": "Task has been updated", "taskId": taskId }]);
    });
}





const getTasks = (req, res) =>{
    const q = `SELECT * FROM task ORDER BY id DESC`;
    db.query(q,(err, data) =>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);

    })
}

const getJobTasks = (req, res) =>{
    const orderid = req.params.orderid;
    const q = `SELECT * FROM task WHERE job_id = ?`;
    db.query(q, orderid, (err, data) =>{
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);

    })
}

const getTask = (req, res) => {
const taskid = req.params.taskid;
const q = `SELECT * FROM task WHERE id = ?`
db.query(q,taskid,(err,data)=>{
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
})
}

const deleteTask = (req, res) =>{
const taskId = req.params.id;
const q = "DELETE FROM task WHERE id = ?"
db.query(q, [taskId], (err,data)=>{
    if (err) res.status(500).json(err);
    return res.json("Task Deleted successfully.");
})
}

module.exports = {addTask,getTasks, deleteTask, getJobTasks,getTask,editTask};