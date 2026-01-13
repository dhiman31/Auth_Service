const { where } = require('sequelize');
const { User , Role } = require('../models/index');
const role = require('../models/role');
const validationError = require('../utils/validation_error');

class userRepo{

    async Register(data) {
        try {
            
            const user = await User.create(data);
            const role = await Role.findOne({
                where: { name: 'CUSTOMER' }
            });

            await user.addRole(role);
            return user;

        } catch (error) {
            if(error.name === 'SequelizeValidationError')
            {
                throw new validationError(error);
            }
            throw error;
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
            throw error
        }
    }

    async isAdmin (userId) {
        try {

            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne ({
                where: {
                    name: 'ADMIN'
                }
            });

            const response = user.hasRole(adminRole);
            return response;

        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
        
    }

    async isCustomer (userId) {
        try {
            const user = await User.findByPk(userId);
            const customerRole = await Role.findOne ({
                where: {
                    name: 'CUSTOMER'
                }
            });
            const response = user.hasRole(customerRole);
            return response;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

    async isAirlineBusiness (userId) {
        try {
            const user = await User.findByPk(userId);
            const airlineBusinessRole = await Role.findOne ({
                where: {
                    name: 'AIRLINE_BUSINESS'
                }
            });
            const response = user.hasRole(airlineBusinessRole);
            return response;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

}

module.exports = userRepo;