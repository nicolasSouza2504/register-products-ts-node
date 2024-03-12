import express from "express";
const routes = express.Router();
routes.get("/ping", (req, res) => {
    res.send("pong");
});
export default routes;
