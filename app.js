const express = require('express');
const cookieparser = require('cookie-parser');
const expresssession = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');

const setting = require('./settings');
const routes = require('./routers');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const mongo_uri = `mongodb://${setting.database.host}:${setting.database.port}`;

const router = express.Router();
const jsonParser = bodyparser.json();

app.use(cors({}));
app.use(express.static('./assets/img'));
app.use('/api', router);

router.get('/home', jsonParser, routes.homeController.getWelcomeInfo);
router.get('/details', jsonParser, routes.detailsController.getSchoolDetails);
router.get('/achievement', jsonParser, routes.achievementsController.getSchoolAchievements);

MongoClient.connect(mongo_uri, {useNewUrlParser: true})
    .then((client) => {
        const db = client.db('school');
        app.locals.welcomeCollection = db.collection('welcome');
        app.locals.detailsCollection = db.collection('details');
        app.locals.achievementsCollection = db.collection('achievement');

        app.listen(setting.APIServerPort, () => {
            console.log('Server run')
        });

    }).catch((error) => {
    console.error(error)
});
