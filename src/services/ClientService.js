const ClientRepository = require('../repositories/ClientRepository')

const index = async () =>{
    return await ClientRepository.findAll()
}

module.exports = {
    index
}