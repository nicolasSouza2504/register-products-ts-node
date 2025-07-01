import {Router} from "express";
import PingRoute from './ping-route.js';
import ProductsRoute from "./product-route.js";

class MainRoutes {

    routes: Router[];

    constructor() {

        this.routes = [];

        this.routes.push(PingRoute);
        this.routes.push(ProductsRoute);

    }

}

export default new MainRoutes().routes;
