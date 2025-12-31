const { StatusCodes } = require('http-status-codes');
const AppErrors = require('./error-handler');

class validationError extends AppErrors {
    constructor(error){
        const errorName = error.name;
        const statusCode = StatusCodes.BAD_REQUEST;
        const explaination = [];
        error.errors.forEach(element => {
            explaination.push(element.message)
        });

        super(
            errorName,
            'NOT ABLE TO VALIDATE THE DATA SENT IN REQUEST',
            explaination,
            statusCode
        )
    }
}

module.exports = validationError;