import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTaskDto, taskType } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { PrismaService } from "../prisma/prisma.service";
import { getReturn } from "src/types/type";

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<taskType> {
    const res = await this.prisma.task.create({
      data: createTaskDto,
    });
    if (!res)
      throw new HttpException(
        "Task not created",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return res;
  }

  async findAll(
    limit?: number,
    page?: number,
    userId?: string,
  ): Promise<getReturn> {
    console.log("userId", userId);
    const pageNum = page;
    const size = limit;
    const whereCondition: any = {
      userId: userId,
    };
    const total = await this.prisma.task.count({
      where: whereCondition,
    });

    const data = await this.prisma.task.findMany({
      where: whereCondition,
      skip: (pageNum - 1) * size,
      take: size,
      orderBy: {
        dueDate: "asc",
      },
    });

    return { data, total, limit: size, page: pageNum };
  }

  findOne(id: string): Promise<taskType> {
    const res = this.prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    if (!res) throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    return res;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<taskType> {
    const isTask = await this.prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    if (!isTask)
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    if (isTask.userId !== updateTaskDto.userId)
      throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED);
    const res = await this.prisma.task.update({
      where: {
        id: id,
      },
      data: updateTaskDto,
    });
    if (!res)
      throw new HttpException(
        "Task not updated",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return res;
  }

  async remove(id: string, userId: string): Promise<string> {
    const isTask = await this.prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    if (!isTask)
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    if (isTask.userId !== userId)
      throw new HttpException("Not authorized", HttpStatus.UNAUTHORIZED);
    await this.prisma.task.delete({
      where: {
        id,
      },
    });
    return "Task deleted";
  }
}
