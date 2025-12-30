const userRepo = require('../repository/userRepository');
const jwt = require('jsonwebtoken');
const {JWT_TOKEN} = require('../config/serverConfig');
const {JWT_EXP} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class userService{
    constructor(){
        this.userRepo = new userRepo;
    }

    async Register (data) {
        try {
            
            const user = await this.userRepo.Register(data);
            return user;

        } catch (error) {
            console.log("Problem in the service layer")
            return {error}
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
            return error
        }
    }

}

module.exports = userService