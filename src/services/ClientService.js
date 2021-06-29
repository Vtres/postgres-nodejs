const ClientRepository = require('../repositories/ClientRepository')

const index = async () =>{
    return await ClientRepository.findAll()
}

const store = async ({name, surname,email,senha,nick_name}) => {
    return await ClientRepository.save({name, surname,email,senha,nick_name})
}

const existsById = async(id) => {
    const response = await ClientRepository.findById(id)

    return response ? true : false
}

const destroy = async(id) =>{
    ClientRepository.remove(id)   
}
module.exports = {
    index, store, existsById, destroy
}