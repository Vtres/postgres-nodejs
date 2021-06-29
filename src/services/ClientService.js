const ClientRepository = require('../repositories/ClientRepository')

const index = async () =>{
    return await ClientRepository.findAll()
}

const store = async ({name, surname,email,senha,nick_name}) => {
    return await ClientRepository.save({name, surname,email,senha,nick_name})
}

module.exports = {
    index, store
}