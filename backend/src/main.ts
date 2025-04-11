// src/main.ts
import { NestFactory } from "@nestjs/core";
import * as session from "express-session";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get ConfigService instance to access env variables
  const configService = app.get(ConfigService);

  // Enable CORS using the client URL from the env file
  app.enableCors({
    origin: configService.get<string>("CLIENT_URL") || "http://localhost:3000",
    credentials: true,
  });

  // Set up the session middleware using SESSION_SECRET from the env file
  app.use(
    session({
      secret: configService.get<string>("SESSION_SECRET") || "defaultSecret",
      resave: false,
      saveUninitialized: false,
    })
  );

  const port = configService.get<number>("PORT") || 3001;
  await app.listen(port);
}
bootstrap();
