import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as express from "express";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import helmet from "helmet";
import * as cors from "cors";

import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import * as fs from "fs";
import { dump } from "js-yaml";

admin.initializeApp();

const server = express();

server.use(helmet());
server.use(cors());

// Swagger用の定義を設定
const options = new DocumentBuilder()
  .setTitle("ufo-society-1974 API")
  .setDescription("The API description")
  .setVersion("1.0")
  .build();

const promiseApplicationReady = NestFactory.create(
  AppModule,
  new ExpressAdapter(server)
).then((app) => {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const document = SwaggerModule.createDocument(app, options);

  try {
    // YAMLファイルに書き込む
    fs.writeFileSync("./swagger-spec.yaml", dump(document, {}));
  } catch {
    // eslint-disable-next-line no-console
    console.error("Failed to create yaml file.");
  }

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
