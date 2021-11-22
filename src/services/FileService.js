const FileRepository = require('../repositories/FileRepository')


const create = async ({nome, result, id_content}) => {
    const fileInsert =  await FileRepository.save(
        {nome, result, id_content}
    )
    return fileInsert;
}
module.exports = {
   create
}