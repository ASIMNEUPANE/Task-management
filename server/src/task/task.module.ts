import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule],

  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
