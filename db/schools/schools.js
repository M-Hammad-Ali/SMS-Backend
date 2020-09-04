const file = require('../Pool')
const pool = file.pool


const getSchools = (req,res)=>{
    pool.query('SELECT * FROM schools order by id asc',(err,result)=>{
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getSchoolsByAdmin = (req,res) =>{
    const user_name = req.params.schoolAdmin
    pool.query("select name from schools where (admin_id in (select id from school_admins where user_name = $1 ))",[user_name],(err,result)=>{
        if(err) {
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getSchoolsById = (req,res)=>{
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM schools WHERE id=$1',[id],(err,result)=>{
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const createSchools = (req,res)=>{
    const {name,admin_id}= req.body

    pool.query('INSERT INTO schools (name,admin_id) VALUES ($1,$2)',[name,admin_id],(err,result)=>{
        if(err){
            throw err
        }
    res.status(200).send('School added Successfully!')
    })
}

const updateSchools = (req,res)=>{
    const id = parseInt(req.params.id)
    const {name,admin_id} = req.body

    pool.query(
        'UPDATE schools SET name = $1, admin_id = $2 WHERE id = $3',
        [name,admin_id,id],
        (err,result)=>{
            if(err){
                throw err
            }
            res.status(200).send(`School modified with ID : ${id}`);
        }
    )
}


const deleteSchools = (req,res)=>{
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM schools WHERE id = $1',[id],
        (err,result)=>{
            if(err){
                throw err
            }
            res.status(200).send(`School deleted with ID: ${id}`)
        }
    )
}

const getSchoolsByUser = (req,res) => {
    const id = (req.params.id);

    pool.query('select * from classes where school_id in (select id from schools where admin_id = $1)',[id],(err,result)=>{
        if(err){
            throw err
        }
        res.status(200).send(result.rows)
    })
}

module.exports = {
    getSchools,
    getSchoolsById,
    createSchools,
    updateSchools,
    deleteSchools,
    getSchoolsByAdmin,
    getSchoolsByUser
}