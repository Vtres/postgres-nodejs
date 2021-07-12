const ClientRepository = require('../repositories/ClientRepository')
const bcrypt = require('bcryptjs')
const index = async () =>{
    return await ClientRepository.findAll()
}

const store = async ({name, surname,email,senha,active}) => {
    const userInsert =  await ClientRepository.save(
        {name, surname, email, senha: bcrypt.hashSync(senha, bcrypt.genSaltSync(10)), active}
    )
    return userInsert;
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

const existsEmail = async(email) =>{
    const response = await ClientRepository.findClientbyEmail(email)
    return response.length > 0 ? true : false
}
module.exports = {
    index, store, existsById, destroy, update,show,existsEmail
}