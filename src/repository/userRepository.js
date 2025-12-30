const { where } = require('sequelize');
const { User } = require('../models/index');

class userRepo{

    async Register(data) {
        try {
            
            const user = await User.create(data);
            return user;

        } catch (error) {
            console.log("Problem in User Repository");
            return {error};
        }
    }

    async getUserbyEmail(email){
        try {
        const user =  await User.findOne({
            where : {
                email
            }
        })
        return user;

        } catch (error) {
            console.log('Problem in User Repository');
            throw error;
        }
    }

    async deleteAccount (userId) {
        try {
            await User.destroy({
                where : {
                    id: userId
                }
            })
        } catch (error) {
            console.log("Cannot Delete the Account")
            return error
        }
    }

}

module.exports = userRepo;