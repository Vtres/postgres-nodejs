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

const searchFileById = async(id)=>{
    const response = await Database.query(`
        SELECT * FROM files WHERE id = $1
    `,[id])
    return response.rows[0]
}

const fileByIdClient = async(id) =>{
    const response = await Database.query(`
        SELECT * FROM files WHERE id = $1
    `,[id])
    return response.rows[0]
}

const filebyContentId = async(id)=>{
    const response = await Database.query(`
        SELECT * FROM files WHERE id_contents = $1
    `,[id])
    return response.rows
}
const imgClient = async(id)=>{
    const response = await Database.query(`
        SELECT nome, result FROM files WHERE id = $1
    `,[id])
    return response.rows[0]
}
module.exports = {
    save,fileSavePost,searchFileById,filebyContentId,fileByIdClient,imgClient
}