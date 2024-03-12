import {Router} from "express";
import PingRoute from './pingRoute.js';

class MainRoutes {

    routes: Router[];

    constructor() {

        this.routes = [];

        this.routes.push(PingRoute);

    }

}

export default new MainRoutes().routes;
