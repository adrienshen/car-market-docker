import Koa from "koa";
import fs from "fs";
import morgan from "koa-morgan";
import bodyParser from "koa-bodyparser";
import path from "path";
import bunyan from "bunyan";

const log = bunyan.createLogger({ name: "App/index" });

import carRouter from "./routes/car";

const app = new Koa();
const PORT = 3000;

const accessLogStream = fs.createWriteStream(__dirname + "/access.log", { flags: "a" });

log.info('Static Files Served From: ', path.join(__dirname, '../../public'));

require('koa-validate')(app);

app
    // @ts-ignore
    .use(morgan("tiny"), { stream: accessLogStream })
    .use(bodyParser())
    .use(carRouter.routes())

const server = app.listen(PORT, () => {
    log.info(`Server listening on port: ${process.env.PORT || PORT}`);
});

module.exports = server;
