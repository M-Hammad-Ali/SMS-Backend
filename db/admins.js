const file = require('./Pool')
const pool = file.pool;

const getAdmins = (req,res)=>{
    pool.query('SELECT * FROM admins order by id asc',(err,result)=>{
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getAdminById = (req,res)=>{
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM admins WHERE id=$1',[id],(err,result)=>{
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const createAdmin = (req,res)=>{
    const {name,password}= req.body

    pool.query('INSERT INTO admins (name,password) VALUES ($1,$2)',[name,password],(err,result)=>{
        if(err){
            throw err
        }
    res.status(200).send(`User added with ID: ${result.insertID}`)
    })
}

const updateAdmin = (req,res)=>{
    const id = parseInt(req.params.id)
    const {name,password} = req.body

    pool.query(
        'UPDATE admins SET name = $1, password = $2 WHERE id = $3',
        [name,password,id],
        (err,result)=>{
            if(err){
                throw err
            }
            res.status(200).send(`User modified with ID : ${id}`);
        }
    )
}


const deleteAdmin = (req,res)=>{
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM admins WHERE id = $1',[id],
        (err,result)=>{
            if(err){
                throw err
            }
            res.status(200).send(`User deleted with ID: ${id}`)
        }
    )
}


module.exports = {
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
}