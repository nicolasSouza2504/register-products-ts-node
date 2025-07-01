import {Router} from "express";
import PingRoute from './ping-route.js';
import ProductsRoute from "./product-route.js";
import LoginRoute from "./login-route.js";

class MainRoutes {

    routes: Router[];

    constructor() {

        this.routes = [];

        this.routes.push(PingRoute);
        this.routes.push(ProductsRoute);
        this.routes.push(LoginRoute);

    }

}

export default new MainRoutes().routes;
