const file = require('./Pool')
const pool = file.pool;

const getSchoolAdmins = (req,res) =>{
    pool.query('SELECT * FROM school_admins ORDER BY id ASC',(err,result)=>{
        if(err){
            throw err
        }
        res.status(200).json(result.rows);
    })
}

const getSchoolAdminsById = (req,res) =>{
    const id = parseInt(req.params.id);

    pool.query('Select * from school_admins where id = ($1)',[id],
        (err,result)=>{
            if(err){
                throw err
            }
            res.status(200).json(result.rows)
        }
    )
}

const createSchoolAdmins = async (req,res) =>{
    const {user_name,password,schoolName} = req.body;
    console.log(req.body);
    const createSchoolAdminResponse = await pool.query('Insert into school_admins (user_name,password) values ($1,$2)',[user_name,password])  
    const createSchoolResponse = await pool.query('Insert into schools(name,admin_id) values ($1,(select max(id) from school_admins))',[schoolName])

    res.status(200).send({"isCreated":true})
}


const deleteSchoolAdmins = (req,res) =>{
    const id = parseInt(req.params.id);

    pool.query('delete from school_admins where id=($1)',[id],
        (err,result)=>{
            if(err){
                throw err
            }
            res.status(200).send({"deleted" : true})
        }
    )
}

module.exports={
    getSchoolAdmins,
    getSchoolAdminsById,
    createSchoolAdmins,
    deleteSchoolAdmins
}