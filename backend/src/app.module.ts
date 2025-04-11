import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { PartnersModule } from "./partners/partners.module";
import { RewardsModule } from "./rewards/rewards.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    // Load env variables globally
    ConfigModule.forRoot({ isGlobal: true }),
    // Use env variable to connect to MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>("MONGO_URI") ||
          "mongodb://localhost:27017/looklookdb",
      }),
    }),
    UsersModule,
    PartnersModule,
    RewardsModule,
    AuthModule,
  ],
})
export class AppModule {}
