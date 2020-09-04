const file = require('../../Pool');
const pool = file.pool;

const createClass= (req,res)=>{
    const {adminId,className} = req.body;
    console.log(req.body);
    pool.query("insert into classes(class_name,school_id) values ( $1 , (select id from schools where admin_id = $2))",[className,adminId],
        (err,result)=>{
            if(err){
                console.log('err');
                throw err
            }
            res.status(200).send({"isCreated":true})
        }
    )
}

const deleteClass = (req,res)=>{
    const id = parseInt(req.params.id)
    const adminId = parseInt(req.params.adminId)

    pool.query("delete from classes_have_students where class_id = $1",[id],(err,result)=>{
        if(err){
            throw err
        }
    })
    pool.query("delete from teachers_teach_classes where class_id = $1",[id],(err,result)=>{
        if(err){
            throw err
        }
    })
    pool.query("delete from classes where id = $1 and school_id = (select id from schools where admin_id = $2)",[id,adminId],(err,result)=>{
        if(err){
            throw err
        }
        res.status(200).send({"isDeleted":true})
    })
}

module.exports = {
    createClass,
    deleteClass     
}