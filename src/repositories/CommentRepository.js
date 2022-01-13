const Database = require('../config/Database')

const save = async (message,id_post,id_client) =>{
    console.log(message,id_post,id_client)
    const response = await Database.query(`
        INSERT INTO comment(
            message, id_post,id_client, date_comment
        )values($1,$2,$3,current_timestamp)
    `, [message,id_post,id_client])

    return response.rows[0]
}

const showCommentId = async(id)=>{
    const response = await Database.query(`
        SELECT * FROM comment WHERE id_post = $1 ORDER BY date_comment
    `,[id])

   return response.rows
}

module.exports = {
    save,showCommentId
}