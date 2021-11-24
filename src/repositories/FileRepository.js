const Database = require('../config/Database')

const save = async ({nome, result, id_content}) =>{
    const response = await Database.query(`
        INSERT INTO files(
            nome, result, id_contents
        )values($1,$2,$3) returning id
    `, [nome,result,id_content])
    return response.rows[0]
}

const fileSavePost = async(nome, result, id_post) =>{
    const response = await Database.query(`
        INSERT INTO files(
            nome,result,id_post
        )values($1,$2,$3)
    `,[nome, result, id_post])
    return response.rows[0]
}

module.exports = {
    save,fileSavePost
}