const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

/**********Require Files********* */
const admindb = require('./db/admins');
const schoolAdminsdb = require('./db/schoolAdmins');
const schoolsdb = require('./db/schools/schools')
const logindb = require('./db/schools/login/login')
const studentdb = require('./db/schools/students/student')
const teacherdb = require('./db/schools/teachers/teachers')
const classdb = require('./db/schools/class/class')
const subjectdb = require('./db/schools/subjects/subjects')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.get('/',(req,res)=>{
    res.send('Welcome to SMS:)');
})
/***********Get the Admins ************/
app.get('/api/admins',admindb.getAdmins)
app.get('/api/admins/:id',admindb.getAdminById)
app.post('/api/admins',admindb.createAdmin)
app.put('/api/admins/:id',admindb.updateAdmin)
app.delete('/api/admins/:id',admindb.deleteAdmin)
/**********School Admins****** */
app.get('/api/schoolAdmins',schoolAdminsdb.getSchoolAdmins)
app.get('/api/schoolAdmins/:id',schoolAdminsdb.getSchoolAdminsById)
app.post('/api/schoolAdmins',schoolAdminsdb.createSchoolAdmins)
app.delete('/api/schoolAdmins/:id',schoolAdminsdb.deleteSchoolAdmins)
/*******Schools********** */
app.get('/api/schools',schoolsdb.getSchools)
app.get('/api/schools/name/:schoolAdmin',schoolsdb.getSchoolsByAdmin)
app.get('/api/schools/:id',schoolsdb.getSchoolsById)
app.post('/api/schools',schoolsdb.createSchools)
app.put('/api/schools/:id',schoolsdb.updateSchools)
app.delete('/api/schools/:id',schoolsdb.deleteSchools)
/**************Login**************/
app.post('/api/login',logindb.verifyLogin)
/**************Get School With the User Name **********/
app.post('/api/schoolClasses/:id',schoolsdb.getSchoolsByUser)
/**************Get Student of Specific Class ***********/
app.post('/api/schoolClasses/:id/classStudents',studentdb.getStudents)
/**************Get Teacher by class ****************/
app.post('/api/schoolClasses/:id/classTeachers',teacherdb.getTeacherByClass)
/****************Create A Class In School *************/
app.post('/api/createClass',classdb.createClass)
/**************Delete Class *****************/
app.delete('/api/deleteClass/:id/:adminId',classdb.deleteClass)
/*************Add Student to Class *************/
app.post('/api/addStudent',studentdb.addStudents)
/***********Delete Student From Class ********/
app.delete('/api/deleteStudent/:classId/:studentId',studentdb.deleteStudent)
/*************All Teacher List of a School  ************/
app.get('/api/teacherList/:adminId',teacherdb.getTeacherBySchool)
/*************Assign Teacher ****************/
app.post('/api/assignTeacher',teacherdb.assignTeacher)
/***********Add Teacher **********/
app.post('/api/addTeacher',teacherdb.addTeacher)
/************Subject By class Id *********/
app.get('/api/getSubjects/:classId',subjectdb.getSubjectsByClassId);
/*************Get Teacher By Subject **********/
app.get('/api/getTeacher/:subjectName',teacherdb.getTeacherBySubject);
/************Update And Assign Teacher **************/
app.post('/api/updateAndAssignTeacher',teacherdb.updateAndAssignTeacher)


app.listen(port,()=>{
    console.log(`App running on ${port}`);
})
