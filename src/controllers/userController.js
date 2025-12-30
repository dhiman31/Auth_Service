const userService = require('../services/user-service');

const userServ = new userService();

const Register = async (req,res) => {
    try {
        const user = await userServ.Register(req.body);
        const userData = user.toJSON();
        userData.password = '*****';

        return res.status(201).json({
            data : userData,
            success : true,
            message : 'Successfully created user',
            err : {}
        })

    } catch (error) {
        console.log("Something went wrong in controller")
        return res.status(500).json({
            data:{},
            success:false,
            message : 'Not able to create user',
            err : error
        })
    }
}

const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        console.log("TOKEN IS : ",token);
        const response = await userServ.isAuthenticated(token)    // response is user.id
        return res.status(201).json({
            data : response,
            success : true,
            message : 'User is Authenticated and User is valid',
            err : {}
        })

    } catch (error) {
        console.log("Something went wrong in controller")
        return res.status(500).json({
            data:{},
            success:false,
            message : error.message,
            err : error
        })
    }
}

const login = async (req,res) => {
    try {
        
        const token = await userServ.login(req.body);
        return res.status(201).json({
            data : token,
            success : true,
            message : 'Successfully login',
            err : {}
        })

    } catch (error) {
        console.log("Something went wrong in controller")
        return res.status(500).json({
            data:{},
            success:false,
            message : error.message,
            err : error
        })
    }
}

const deleteAccount = async (req,res) => {
    try {
        
        const response = await userServ.deleteAccount(req.body);
        return res.status(201).json({
            data : response ,
            success : true,
            message : 'Successfully deleted user',
            err : {}
        })

    } catch (error) {
        console.log("Issue in controller");
        return error
    }
}


module.exports = {
    Register,
    login,
    deleteAccount,
    isAuthenticated
}