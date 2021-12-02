const Database = require('../config/Database')

const save = async (message,id_post) =>{
    const response = await Database.query(`
        INSERT INTO comment(
            message, id_post,date_comment
        )values($1,$2,current_timestamp)
    `, [message,id_post])

    return response.rows[0]
}

const showCommentId = async(id)=>{
    const response = await Database.query(`
        SELECT * FROM comment WHERE id_post = $1 ORDER BY date_comment
    `,[id])

    console.log(response)
}

module.exports = {
    save,showCommentId
}