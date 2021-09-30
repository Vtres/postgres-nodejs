const jwt = require('jsonwebtoken')

const checkAuth = (role)=>{
    return (req, res, next) => {
        const {authorization} = req.headers

        if(!authorization){
            return res.status(401).json({message: 'Authorization type is ampty'})
        }

        if(authorization.split(' ')[0] !== 'Bearer'){
            return res.status(401).json({message: 'Authorization type Bearer was not sent'})
        }

        const SECRET_KEY = process.env.SECRET_KEY

        if(!SECRET_KEY){
            return res.status(401).json({message: 'Environment SECRET_KEY is empty'})
        }

        try {
            const {id} = jwt.verify(authorization.split(' ')[1], SECRET_KEY)

            req.user_id = id
            next()
        } catch (error) {
            return res.status(401).json(error)
        }

    }
}

module.exports={
    checkAuth
}