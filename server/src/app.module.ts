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
import { TaskModule } from './task/task.module';
@Module({
  imports: [ConfigModule.forRoot(), AuthsModule, UserModule, PrismaModule, TaskModule],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: RoleGuard },
    PrismaService,
    AppService,
  ],
})
export class AppModule {}
