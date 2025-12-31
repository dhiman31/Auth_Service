const express = require('express');
const app = express();
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const bodyParser = require('body-parser')
const db = require('./models/index');
const {User , Role} = require('./models/index')

const prepareAndStartServer = async () => {

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);

    // if(process.env.DB_SYNC){
    //     db.sequelize.sync({alter:true});
    // }

    app.listen(PORT , () => {
        console.log(`Server started on Port : ${PORT}`);
    });
}

prepareAndStartServer();