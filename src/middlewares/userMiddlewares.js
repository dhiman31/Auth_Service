const validLoginRequest = (req,res,next) => {
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

const validSignUpRequest = (req,res,next) => {
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

module.exports = {
    validLoginRequest,
    validSignUpRequest
}