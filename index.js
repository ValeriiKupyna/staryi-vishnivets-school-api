const express = require('express');
const cors = require('cors');

const setting = require('./settings');
const routes = require('./routers');
const index = express();

const MongoClient = require('mongodb').MongoClient;
// const mongo_uri = process.env.MONGO_URL || `mongodb://${setting.database.host}:${setting.database.port}`;

const mongo_uri = 'mongodb://heroku_tjzpp08t:12Goo0206@@ds249127.mlab.com:49127/heroku_tjzpp08t';
const router = express.Router();

index.use(cors({}));
index.use(express.static('./assets/img'));
index.use('/api', router);

router.get('/home', routes.homeController.getWelcomeInfo);
router.get('/details', routes.detailsController.getSchoolDetails);
router.get('/achievement', routes.achievementsController.getSchoolAchievements);

MongoClient.connect(mongo_uri, { useNewUrlParser: true })
    .then((client) => {

        console.log(mongo_uri);

        const db = client.db('school');
        index.locals.welcomeCollection = db.collection('welcome');
        index.locals.detailsCollection = db.collection('details');
        index.locals.achievementsCollection = db.collection('achievement');

        index.listen(setting.APIServerPort, () => {
            console.log('Server run')
        });

    }).catch((error) => {
    console.error(error)
});