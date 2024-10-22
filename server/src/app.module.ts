import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthsModule } from "./auths/auths.module";
import { UserModule } from "./users/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RoleGuard } from "./auths/guards/role.guard";
import { PrismaService } from "./prisma/prisma.service";
import { APP_GUARD } from "@nestjs/core";
@Module({
  imports: [ConfigModule.forRoot(), AuthsModule, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: RoleGuard },
    PrismaService,
    AppService,
  ],
})
export class AppModule {}
