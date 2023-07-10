import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from "express";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import helmet from "helmet";
import * as cors from "cors";

import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { options } from "./documentOptions";

admin.initializeApp();

const server = express();

server.use(helmet());
server.use(cors());

const promiseApplicationReady = NestFactory.create(
  AppModule,
  new ExpressAdapter(server)
).then((app) => {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const document = SwaggerModule.createDocument(app, options);

  // api/swagger に仕様を表示する
  SwaggerModule.setup("swagger", app, document);
  return app.init();
});

export const api = functions
  .region("asia-northeast2")
  .https.onRequest(async (...args) => {
    await promiseApplicationReady;
    server(...args);
  });
