import PingRoute from './pingRoute.js';
import ProductsRoute from "./productsRoute.js";
class MainRoutes {
    routes;
    constructor() {
        this.routes = [];
        this.routes.push(PingRoute);
        this.routes.push(ProductsRoute);
    }
}
export default new MainRoutes().routes;
