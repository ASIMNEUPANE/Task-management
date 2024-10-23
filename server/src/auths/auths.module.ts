import { Module } from "@nestjs/common";
import { AuthsService } from "./auths.service";
import { AuthsController } from "./auths.controller";
import { BcryptPass } from "src/utils/Bcrypt";
import { PrismaModule } from "src/prisma/prisma.module";
import { TaskController } from "src/task/task.controller";
import { UserController } from "src/users/user.controller";
import { UserService } from "src/users/user.service";
import { TaskService } from "src/task/task.service";

@Module({
  imports: [PrismaModule],

  controllers: [AuthsController, TaskController, UserController],
  providers: [AuthsService, UserService, TaskService, BcryptPass],
})
export class AuthsModule {}
