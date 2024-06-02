import express, { Express } from "express";
import { json, urlencoded } from "body-parser";
import { mainRouter } from "./routes";

const port = process.env.NODE_PORT || 8082;

export const app: Express = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/", mainRouter);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server is up on port: ${port}`);
});
