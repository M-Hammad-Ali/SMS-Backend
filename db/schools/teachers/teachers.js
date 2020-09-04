const file = require('../../Pool')
const pool = file.pool


const getTeacherByClass = (req,res) =>{
    const classId = parseInt(req.params.id);
    const {schoolAdminId} = req.body;

    pool.query('select * from teachers where id in (select teacher_id from teachers_teach_classes where class_id in(select id from classes where id = $1 and school_id in(select id from schools where admin_id = $2)))',
        [classId,schoolAdminId],(err,result)=>{
            if(err){
                throw err;
            }
            res.status(200).send(result.rows)
        }
    )
}

const getTeacherBySchool = async (req,res) => {
    const adminId = parseInt(req.params.adminId)

    const response = await pool.query('select * from teachers where school_id = (select id from schools where admin_id =$1)',[adminId])
    res.status(200).send(response.rows)
}

const assignTeacher = async (req,res) => {
    const {teacherId,className} = req.body;
    const assignTeacherResponse = await pool.query('insert into teachers_teach_classes(teacher_id,class_id) values ($1,(select id from classes where class_name= $2))',[teacherId,className]);

    if(assignTeacherResponse.rowCount == 1) {
        res.status(200).send({"isAssigned":true})
    }
}

const addTeacher = async (req,res) => {
    console.log(req.body);
    const {firstName,lastName,contactNo,emailId,qualification,experience,adminId} = req.body;
    const addTeacherResponse = await pool.query('insert into teachers(first_name,last_name,contact_no,email_id,qualification,experience,school_id) values ($1,$2,$3,$4,$5,$6,(select id from schools where admin_id = $7))',
        [firstName,lastName,contactNo,emailId,qualification,experience,adminId]
    )
    if(addTeacherResponse.rowCount == 1){
        res.status(200).send({"isAdded":true})
    }
}

const getTeacherBySubject = async (req,res,next) => {
    const subjectName = '%' +req.params.subjectName + '%';
    const getTeacherBySubjectResponse = await pool.query("select * from teachers where lower(qualification) like  lower($1)",[subjectName])
    if(getTeacherBySubjectResponse.rowCount >=1){
        res.status(200).send(getTeacherBySubjectResponse.rows)
    }
    else{
        res.status(200).send([{
            "id": 0,
            "first_name": 'No',
            "last_name":"Teacher",
            "contact_no":'',
            "email_id":'',
            "qualification" : '',
            "experience":0,
            "school_id":0
        }])
    }
}

const updateAndAssignTeacher = async (req,res) => {
    const {subjectId,teacherId} = req.body;
    const updateAndAssignTeacherResponse = await pool.query('insert into teachers_have_subjects(teachers_id,subjects_id) values ($1,$2) on conflict (subjects_id) do update set teachers_id = $1',[teacherId,subjectId])
    if (updateAndAssignTeacherResponse.rowCount == 1) {
        res.status(200).send({"isAssigned":true})
    }
}


module.exports = {
    getTeacherByClass,
    getTeacherBySchool,
    assignTeacher,
    addTeacher,
    getTeacherBySubject,
    updateAndAssignTeacher,
}