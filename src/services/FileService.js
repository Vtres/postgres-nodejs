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

const filebyContentId = async(id)=>{
    const response = await FileRepository.filebyContentId(id)
    return response
}

const fileClient = async (id) => {
    const fileInsert =  await FileRepository.fileByIdClient(id)
    return fileInsert
}
const searchFileById = async(id)=>{
    const response = await FileRepository.searchFileById(id)
    return response
}

const imgClient = async(id)=>{
    const response = await FileRepository.imgClient(id)
    return response
}
module.exports = {
   create,fileCreatePost,searchFileById,filebyContentId,fileClient,imgClient
}