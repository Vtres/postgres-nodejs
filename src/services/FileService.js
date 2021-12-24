const FileRepository = require('../repositories/FileRepository')


const create = async ({nome, result, id_content}) => {
    const fileInsert =  await FileRepository.save(
        {nome, result, id_content}
    )
    return fileInsert;
}
const fileCreatePost = async (nome, result, id_post) => {
    const fileInsert =  await FileRepository.fileSavePost(nome, result, id_post)
    return fileInsert;
}

// const fileClient = async (id) => {
//     const fileInsert =  await FileRepository.fileByIdClient(id)
//     return fileInsert
// }
module.exports = {
   create,fileCreatePost
}