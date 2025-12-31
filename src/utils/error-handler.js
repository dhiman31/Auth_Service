const {StatusCodes} = require('http-status-codes')

class AppErrors extends Error {
    constructor(
        name='AppError',
        message = 'Something went wrong',
        explaination='something went wrong',
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR){
        
        super()
        this.message = message,
        this.explaination = explaination,
        this.name = name,
        this.statusCode = statusCode
    }
}

module.exports = AppErrors;