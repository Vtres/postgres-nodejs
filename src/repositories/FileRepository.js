const Database = require('../config/Database')

const save = async ({nome, result, id_content}) =>{
    const response = await Database.query(`
        INSERT INTO files(
            nome, result, id_contents
        )values($1,$2,$3) returning id
    `, [nome,result,id_content])
    console.log(response.rows[0])
    return response.rows[0]
}

module.exports = {
    save
}