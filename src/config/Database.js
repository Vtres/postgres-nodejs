const {Pool} = require('pg')
const {HOST_DB,PORT_DB,DATABASE_DB,USER_DB,PASSWORD_DB} = process.env

console.log(
    !HOST_DB ? 'HOST_DB nao esta configurado em .env'
    : !PORT_DB ? 'PORT_DB nao esta configurado em .env'
    : !DATABASE_DB ? 'DATABASE_DB nao esta configurado em .env'
    : !USER_DB ? 'USER_DB nao esta configurado em .env'
    : !PASSWORD_DB ? 'PASSWORD_DB nao esta configurado em .env'
    : 'Database is configured on .env'
)
module.exports = new Pool ({
    host: HOST_DB,
    port: Number(PORT_DB),
    database: DATABASE_DB,
    user: USER_DB,
    password: PASSWORD_DB
})