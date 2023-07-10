import { DocumentBuilder } from "@nestjs/swagger";

// Swagger用の定義を設定
export const options = new DocumentBuilder()
  .setTitle("ufo-society-1974 API")
  .setDescription("The API description")
  .setVersion("1.0")
  .build();
