const file = require('../../Pool');
const schoolAdmins = require('../../schoolAdmins');
const pool = file.pool;


const getStudents= async (req,res)=>{
    const id = parseInt(req.params.id);
    const {schoolAdminId} =  req.body;

    const getStudentsResponse =  await pool.query('select * from students where id in (select student_id from classes_have_students where class_id in (select id from classes where id = $1 and school_id in( select id from schools where admin_id in (select id from school_admins where id = $2) )))',[id,schoolAdminId])
    res.status(200).send(getStudentsResponse.rows)
}

const addStudents = async (req,res) => {
    console.log(req.body);
    const {adminId,classId,firstName,lastName,fatherName,contactNo} = req.body;

    const addStudentResponse = await pool.query('insert into students(first_name,last_name,father_name,contact_no,school_id)values($1,$2,$3,$4,(select id from schools where admin_id = $5))',[firstName,lastName,fatherName,contactNo,adminId]);
    const addStudentToClassResponse = await pool.query('insert into classes_have_students(student_id,class_id)values((select id from students where first_name=$1 and last_name=$2 and father_name=$3 and school_id= (select id from schools where admin_id = $4) and contact_no = $6),$5)',[firstName,lastName,fatherName,adminId,classId,contactNo])

    res.status(200).send({"isCreated":true})
}

const deleteStudent = async (req,res) => {
    const classId = parseInt(req.params.classId);
    const studentId = parseInt(req.params.studentId)

    const deleteFromClasses = await pool.query('delete from classes_have_students where class_id = $1 and student_id = $2',[classId,studentId])
    const deleteFromStudents = await pool.query('delete from students where id = $1',[studentId])

    res.status(200).send({"isDeleted":true})
}

module.exports = {
    getStudents,
    addStudents,
    deleteStudent
}