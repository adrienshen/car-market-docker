import app from './index';
import bunyan from "bunyan";

const log = bunyan.createLogger({ name: "App/start" });
const PORT = 3000;

const server = app.listen(PORT, () => {
    log.info(`Server listening on port: ${process.env.PORT || PORT}`);
});

export default server;
