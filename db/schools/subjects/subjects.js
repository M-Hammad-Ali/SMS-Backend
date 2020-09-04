const file = require('../../Pool');
const pool = file.pool;

const getSubjectsByClassId = async (req,res) => {
    const classId = parseInt(req.params.classId);
    const getSubjectsByClassIdResponse = await pool.query('select subject_id,subject_name,teachers_id,first_name,last_name from subjects inner join classes_have_subjects on subjects.id = classes_have_subjects.subject_id left join teachers_have_subjects on teachers_have_subjects.subjects_id = subjects.id left join teachers on teachers_have_subjects.teachers_id = teachers.id where class_id = $1 ',[classId])
    if(getSubjectsByClassIdResponse.rowCount >= 1) {
        res.status(200).send(getSubjectsByClassIdResponse.rows)
    }
}

module.exports = {
    getSubjectsByClassId
}