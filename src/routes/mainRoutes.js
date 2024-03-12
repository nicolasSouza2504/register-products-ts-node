import PingRoute from './pingRoute.js';
class MainRoutes {
    routes;
    constructor() {
        this.routes = [];
        this.routes.push(PingRoute);
    }
}
export default new MainRoutes().routes;
