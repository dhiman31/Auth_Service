const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    JWT_TOKEN : process.env.JWT_SECRET,
    JWT_EXP : process.env.JWT_EXPIRES_IN
}