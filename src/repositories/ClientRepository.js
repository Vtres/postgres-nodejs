const Database = require('../config/Database')
const findAll = async () =>{
    const response = await Database.query(`
        SELECT * FROM client ORDER BY user_id
    `)

    return response.rows
}

module.exports = {
    findAll
}