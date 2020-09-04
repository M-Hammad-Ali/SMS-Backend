const file = require('../../Pool')
const pool = file.pool

const verifyLogin = async (req,res)=>{
    const {user_name,password} = req.body;
    var isAdmin = false;
    var isUser= false;
    var row = {};

    const adminResponse = await pool.query('select * from admins where name = $1 and password = $2',[user_name,password]);

    const userResponse=await  pool.query('select * from school_admins where user_name = $1 and password = $2',[user_name,password])

    if(adminResponse.rowCount ==1 ){
        row = {};
        isAdmin = true;
        isUser=false;
        row = adminResponse.rows
    }
    else if(userResponse.rowCount ==1){
        row = {};
        isAdmin = false;
        isUser = true;
        row = userResponse.rows
    }
    
    res.status(200).send([{"isAdmin":isAdmin,"isSchoolAdmin":isUser},row])
    
}

module.exports= {
    verifyLogin
}