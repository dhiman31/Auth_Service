const validAuthRequest = (req,res,next) => {
    const {email , password} = req.body;
    if(!email || email.trim() === '')
    {
        return res.status(400).json({
        success: false,
        message: 'Email is required',
        data: {},
        err: {}
        });
    }
    if(!password || password.trim() === '')
    {
        return res.status(400).json({
        success: false,
        message: 'Password is required',
        data: {},
        err: {}
    });
    }

    req.body = {
    email: email.trim(),
    password: password
    };

    next();
}

const validate_is_user_request = (req,res,next) => {
    if(!req.body.id){
        return res.status(400).json({
        success: false,
        message: 'User Id not sent',
        data: {},
        err: {}
        }); 
    }

    next();
}

module.exports = {
    validAuthRequest,
    validate_is_user_request
}