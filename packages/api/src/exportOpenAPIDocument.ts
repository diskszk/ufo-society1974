import { dump } from "js-yaml";
import * as fs from "node:fs";
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { options } from "./documentOptions";

import * as admin from "firebase-admin";

admin.initializeApp();

const exportOpenAPIDocument = async () => {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, options);

  // YAMLファイルに書き込む
  fs.writeFileSync("./swagger-spec.yaml", dump(document, {}));
};

(async () => await exportOpenAPIDocument())();
