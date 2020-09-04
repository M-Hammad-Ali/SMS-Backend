const Pool = require('pg').Pool
const pool = new Pool({
    user : 'maaddii',
    host: 'localhost',
    database: 'sms',
    password: '1846888',
    port: 5432
})

module.exports={
    pool
}
