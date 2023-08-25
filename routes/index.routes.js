

const apiV1 = "/moviesapp/api";
const authenticationRoutes = require('./authentication.routes');
const moviesRoute = require('./movies.routes');
const authorizationMiddleware = require('../middlewares/authorization');


const applyAppRoutes = (app) => {

    app.use(`${apiV1}/authentication`, authenticationRoutes);
    app.use(authorizationMiddleware.verifyToken);
    app.use(`${apiV1}/movies`, moviesRoute);
};

module.exports.applyAppRoutes = applyAppRoutes;
