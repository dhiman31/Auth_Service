const userRepo = require('../repository/userRepository');
const jwt = require('jsonwebtoken');
const {JWT_TOKEN} = require('../config/serverConfig');
const {JWT_EXP} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class userService{
    constructor(){
        this.userRepo = new userRepo;
    }

    async verifyToken (token) {
        try {
            const response = jwt.verify(token,JWT_TOKEN);
            return response
        } catch (error) {
            console.error('JWT verification failed:', error.message);
            throw new Error('Invalid or expired token');
        }
    }

    async isAuthenticated (token) {
        try {
            const response = await this.verifyToken(token);
            if(!response){
                throw new Error('Invalid Token');
            }

            // suppose you had the token but the user account was deleted
            const user = await this.userRepo.getUserbyEmail(response.email);
            if(!user){
                throw new Error('User no longer exists');
            }

            // return user.id;
            return true;

        } catch (error) {
            console.log("Problem in the service layer")
            throw error
        }
    }

    async Register (data) {
        try {
            
            const user = await this.userRepo.Register(data);
            return user;

        } catch (error) {
            if(error.name === 'SequelizeValidationError')
            {
                throw error;
            }
            console.log("Problem in the service layer")
            throw error
        }
    }

    async getUserByEmail(email) {
    const user = await this.userRepo.getUserbyEmail(email);
    if (!user) {
      throw new Error('Invalid Email');
    }
    return user;
    }

    async login(data) {
        const incomingpass = data.password;
        const incomingemail = data.email;
        const user = await this.getUserByEmail(incomingemail);

        // Redundant becuase error will be thown from this.getUserByEmail only
        // if(!user)
        // {
        //     throw new Error('Invalid Email');
        // }

        const checkPassword = await bcrypt.compare(incomingpass , user.password);
        if(!checkPassword)
        {
            throw new Error('Invalid Password');
        }

        console.log('JWT_TOKEN:', JWT_TOKEN);
        console.log('JWT_EXP:', JWT_EXP);


        const token = jwt.sign({id:user.id,email:incomingemail} , JWT_TOKEN , {expiresIn : JWT_EXP});

        return token;

    }

    async deleteAccount (data) {
        const incomingpass = data.password;
        const incomingemail = data.email;
        const user = await this.getUserByEmail(incomingemail);
        const checkPassword = await bcrypt.compare(incomingpass , user.password);
        if(!checkPassword)
        {
            throw new Error('Invalid Password');
        }

        const userId = user.id
        console.log("THE USER ID IS : ",userId);

        try {
            await this.userRepo.deleteAccount(userId);
        } catch (error) {
            console.log("Cannot delete the account")
            throw error
        }
    }

    async isAdmin (userId) {
        try {
            const response = this.userRepo.isAdmin(userId);
            return response
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async isCustomer (userId) {
        try {
            const response = this.userRepo.isCustomer(userId);
            return response
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async isAirlineBusiness (userId) {
        try {
            const response = this.userRepo.isAirlineBusiness(userId);
            return response
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

}

module.exports = userService