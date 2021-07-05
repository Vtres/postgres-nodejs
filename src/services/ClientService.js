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

const update = async({id, name, surname,email,senha,nick_name}) =>{
    return await ClientRepository.update({id,name, surname,email,senha,nick_name})
}

const show = async(id) =>{
    return await ClientRepository.findClientById(id)
}
module.exports = {
    index, store, existsById, destroy, update,show
}