const express = require('express')
const bodyParser = require('body-parser')
const mysql      = require('mysql');
const server = express();
server.use(bodyParser.json());
const cors = require('cors');

server.use(cors());  

//db conn
var dbconn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'iitc_db'
  });

dbconn.connect(function (error) {
    if (error) {
        console.log("Error connecting to DB");
    } else {
        console.log("Successfully Connected to DB");
    }
});

//start port
server.listen(7890, function check(error) {
    if (error) {
        console.log("Error....!!!!");
    } else {
        console.log("Started port 7890....!!!!");
    }
});

// #region student Api
//get max student id
server.get("/api/student/maxId",  (req, res) => {
    var sql = "SELECT MAX(Id) AS maxId FROM student_detail";

    dbconn.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Error getting max ID" });
        } else {
            let nextId = (result[0].maxId || 0) + 1;
            res.send({ status: true, nextId: nextId });
        }
    });

});

//student add api
server.post("/api/student/add",  (req, res) => {
    let details = {
        Id: req.body.Id,
        CourseYear: req.body.CourseYear,
        CourseId: req.body.CourseId,
        FullName: req.body.FullName,
        NameWithInitials: req.body.NameWithInitials,
        Nic: req.body.Nic,
        MISNumber: req.body.MISNumber,
        Mobile: req.body.Mobile,
        Address: req.body.Address,
        Gender: req.body.Gender,
        Deleted: req.body.Deleted,
        Changed: req.body.Changed,
        User: req.body.User,
        DateEntered: req.body.DateEntered,
        Dropout: req.body.Dropout,
        FinalExamSitted: req.body.FinalExamSitted,
        RepeatStudent: req.body.RepeatStudent,
    };

    let sql = "INSERT INTO student_detail SET ?"
    dbconn.query(sql, details, (error) => {
        if (error) {
            res.send({status:false, message: "Student Adding Failed..!"});
        } else {
            res.send({status:true, message: "Student Adding Succesful..!"});
        }
    });
});

//view students
server.get("/api/student",  (req, res) => {
    var sql = "SELECT * FROM student_detail";

    dbconn.query(sql, function(error, result) {
        if (error) {
            res.send({status:false, message: "Error showing data"});
        } else {
            res.send({status:true, data: result });
        }
    });
});

//search student
server.get("/api/student/:id",  (req, res) => {
    var stId = req.params.id;
    var sql = "SELECT * FROM student_detail WHERE Id =" + stId;

    dbconn.query(sql, function(error, result) {
        if (error) {
            res.send({status:false, message: "Error showing data"});
        } else {
            res.send({status:true, data: result });
        }
    });
});

//update student
server.put("/api/student/update/:id",  (req, res) => {
    var sql = "UPDATE student_detail SET CourseYear='" + req.body.CourseYear +
                                     "', CourseId='" + req.body.CourseId +
                                     "', FullName='" + req.body.FullName +
                                     "', NameWithInitials='" + req.body.NameWithInitials +
                                     "', Nic='" + req.body.Nic +
                                     "', MISNumber='" + req.body.MISNumber +
                                     "', Mobile='" + req.body.Mobile +
                                     "', Address='" + req.body.Address +
                                     "', Gender='" + req.body.Gender +
                                     "', Deleted='" + req.body.Deleted +
                                     "', Changed='" + req.body.Changed +
                                     "', User='" + req.body.User +
                                     "', DateEntered='" + req.body.DateEntered +
                                     "', Dropout='" + req.body.Dropout +
                                     "', FinalExamSitted='" + req.body.FinalExamSitted +
                                     "', RepeatStudent='" + req.body.RepeatStudent +
                                     "'  WHERE Id=" + req.params.id;

    dbconn.query(sql, function(error) {
        if (error) {
            res.send({status:false, message: "Student Update Failed"});
        } else {
            res.send({status:true, message: "Student Update Successfully" });
        }
    });
});

//delete student
server.delete("/api/student/delete/:id", (req, res) => {
    let sql = "DELETE FROM student_detail WHERE Id=" + req.params.id + "";
    dbconn.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Student Deleted Failed" });
        } else {
            res.send({ status: true, message: "Student Deleted successfully" });
        }
    });
});
// #endregion  

// #region course module api
//get max course module id
server.get("/api/course_module/maxId",  (req, res) => {
    var sql = "SELECT MAX(ModuleId) AS maxId FROM course_module";

    dbconn.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Error getting max ID" });
        } else {
            let nextId = (result[0].maxId || 0) + 1;
            res.send({ status: true, nextId: nextId });
        }
    });
});

//Add course modules
server.post("/api/course_module/add",  (req, res) => {
    let details = {
        ModuleId: req.body.ModuleId,
        ModuleName: req.body.ModuleName,
        ModuleCode: req.body.ModuleCode,
        Active: req.body.Active,
        User: req.body.User,
    };

    let sql = "INSERT INTO course_module SET ?"
    dbconn.query(sql, details, (error) => {
        if (error) {
            res.send({status:false, message: "Course module Adding Failed..!"});
        } else {
            res.send({status:true, message: "Course module Added Succesfully..!"});
        }
    });
});

//view course modules
server.get("/api/course_module",  (req, res) => {
    var sql = "SELECT * FROM course_module";

    dbconn.query(sql, function(error, result) {
        if (error) {
            res.send({status:false, message: "Error showing data"});
        } else {
            res.send({status:true, data: result });
        }
    });
});

//seacrh course module
server.get("/api/course_module/:id",  (req, res) => {
    var moduleId = req.params.id;
    var sql = "SELECT * FROM course_module WHERE ModuleId =" + moduleId;

    dbconn.query(sql, function(error, result) {
        if (error) {
            res.send({status:false, message: "Error showing data"});
        } else {
            res.send({status:true, data: result });
        }
    });
});

//update course module
server.put("/api/course_module/update/:id",  (req, res) => {
    var sql = "UPDATE course_module SET ModuleName='" + req.body.ModuleName +
                                     "', ModuleCode='" + req.body.ModuleCode +
                                     "', Active='" + req.body.Active +
                                     "', User='" + req.body.User +
                                     "'  WHERE ModuleId=" + req.params.id;

    dbconn.query(sql, function(error) {
        if (error) {
            res.send({status:false, message: "Course module Update Failed"});
        } else {
            res.send({status:true, message: "Course module Updated Successfully" });
        }
    });
});


//delete course module
server.delete("/api/course_module/delete/:id", (req, res) => {
    let sql = "DELETE FROM course_module WHERE ModuleId=" + req.params.id + "";
    dbconn.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Course module Delete Failed" });
        } else {
            res.send({ status: true, message: "Course module Deleted successfully" });
        }
    });
});

server.get("/api/course_module/load/code",  (req, res) => {
    var sql = "SELECT ModuleCode FROM course_module";

    dbconn.query(sql, function(error, result) {
        if (error) {
            res.send({status:false, message: "Error showing codes"});
        } else {
            res.send({status:true, data: result });
        }
    });
});

// #endregion

// #region course detail api
//get max course id
server.get("/api/course/maxId",  (req, res) => {
    var sql = "SELECT MAX(CD_ID) AS maxId FROM course_detail";

    dbconn.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Error getting max ID" });
        } else {
            let nextId = (result[0].maxId || 0) + 1;
            res.send({ status: true, nextId: nextId });
        }
    });
});

//Add course detail
server.post("/api/course/add",  (req, res) => {
    let details = {
        CD_ID: req.body.CD_ID,
        CourseName: req.body.CourseName,
        CourseType: req.body.CourseType,
        Duration: req.body.Duration,
        Medium: req.body.Medium,
        CourseLevel: req.body.CourseLevel,
        ModuleCode: req.body.CourseLevel,
        DateEntered: req.body.DateEntered,
        Active: req.body.Active,
        User: req.body.User,
    };

    let sql = "INSERT INTO course_detail SET ?"
    dbconn.query(sql, details, (error) => {
        if (error) {
            res.send({status:false, message: "Course detail Adding Failed..!"});
        } else {
            res.send({status:true, message: "Course detail Added Succesfully..!"});
        }
    });
});

//view course detail
server.get("/api/course",  (req, res) => {
    var sql = "SELECT * FROM course_detail";

    dbconn.query(sql, function(error, result) {
        if (error) {
            res.send({status:false, message: "Error showing data"});
        } else {
            res.send({status:true, data: result });
        }
    });
});

//seacrh course detail
server.get("/api/course/:id",  (req, res) => {
    var CD_ID = req.params.id;
    var sql = "SELECT * FROM course_detail WHERE CD_ID =" + CD_ID;

    dbconn.query(sql, function(error, result) {
        if (error) {
            res.send({status:false, message: "Error showing data"});
        } else {
            res.send({status:true, data: result });
        }
    });
});

//update course detail
server.put("/api/course/update/:id",  (req, res) => {
    var sql = "UPDATE course_detail SET CourseName='" + req.body.CourseName +                  
                                     "', CourseType='" + req.body.CourseType +
                                     "', Duration='" + req.body.Duration +
                                     "', Medium='" + req.body.Medium +
                                     "', CourseLevel='" + req.body.CourseLevel +
                                     "', ModuleCode='" + req.body.ModuleCode +
                                     "', Active='" + req.body.Active +
                                     "', DateEntered='" + req.body.DateEntered +
                                     "', User='" + req.body.User +
                                     "'  WHERE CD_ID=" + req.params.id;
    dbconn.query(sql, function(error) {
        if (error) {
            res.send({status:false, message: "Course Update Failed"});
        } else {
            res.send({status:true, message: "Course Updated Successfully" });
        }
    });
});


//delete course detail
server.delete("/api/course/delete/:id", (req, res) => {
    let sql = "DELETE FROM course_detail WHERE CD_ID=" + req.params.id + "";
    dbconn.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Course detail Delete Failed" });
        } else {
            res.send({ status: true, message: "Course detail Deleted successfully" });
        }
    });
});

// get course id
server.get("/api/course/load/id",  (req, res) => {
    var sql = "SELECT CD_ID FROM course_detail";

    dbconn.query(sql, function(error, result) {
        if (error) {
            res.send({status:false, message: "Error showing id"});
        } else {
            res.send({status:true, data: result });
        }
    });
});
// #endregion

// #region exam result api
//Add exam result
server.post("/api/exam_result/add",  (req, res) => {
    let details = {
        StudentId: req.body.StudentId,
        CourseYear: req.body.CourseYear,
        ModuleCode: req.body.ModuleCode,
        Marks: req.body.Marks,
        DateEntered: req.body.DateEntered,
        User: req.body.User,
    };

    let sql = "INSERT INTO student_exam_result SET ?"
    dbconn.query(sql, details, (error) => {
        if (error) {
            res.send({status:false, message: "exam_result Adding Failed..!"});
        } else {
            res.send({status:true, message: "exam_result Added Succesfully..!"});
        }
    });
});

//view exam detail
server.get("/api/exam_result",  (req, res) => {
    var sql = "SELECT * FROM student_exam_result";

    dbconn.query(sql, function(error, result) {
        if (error) {
            res.send({status:false, message: "Error showing data"});
        } else {
            res.send({status:true, data: result });
        }
    });
});

//seacrh exam result
server.get("/api/exam_result/:id",  (req, res) => {
    var StudentId = req.params.id;
    var sql = "SELECT * FROM student_exam_result WHERE StudentId =" + StudentId;

    dbconn.query(sql, function(error, result) {
        if (error) {
            res.send({status:false, message: "Error showing data"});
        } else {
            res.send({status:true, data: result });
        }
    });
});

//update exam result
server.put("/api/exam_result/update/:id/:ModuleCode",  (req, res) => {
    var sql = "UPDATE student_exam_result SET CourseYear='" + req.body.CourseYear + 
                                     "', Marks='" + req.body.Marks +
                                     "', DateEntered='" + req.body.DateEntered +
                                     "', User='" + req.body.User +
                                     "'  WHERE StudentId=" + req.params.id +
                                     " AND ModuleCode='" + req.params.ModuleCode + "'";
    dbconn.query(sql, function(error) {
        if (error) {
            res.send({status:false, message: "Exam result Update Failed"});
        } else {
            res.send({status:true, message: "Exam result Updated Successfully" });
        }
    });
});


//delete exam result
server.delete("/api/exam_result/delete/:id/:ModuleCode", (req, res) => {
    let sql = "DELETE FROM student_exam_result WHERE StudentId=" + req.params.id + " AND ModuleCode='" + req.params.ModuleCode + "'";
    dbconn.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Exam result Delete Failed" });
        } else {
            res.send({ status: true, message: "Exam result Deleted successfully" });
        }
    });
});

// #endregion