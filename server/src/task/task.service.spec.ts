import { Test, TestingModule } from "@nestjs/testing";
import { TaskService } from "./task.service";
import { PrismaService } from "../prisma/prisma.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { mailer } from "src/utils/mailer";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

const mockTask = {
  id: "1",
  title: "Test Task",
  userId: "2",
  dueDate: new Date(),
  isCompleted: false,
  user: {
    email: "user@example.com",
  },
};

const mockPrismaService = {
  task: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("TaskService", () => {
  let service: TaskService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a task", async () => {
      const createTaskDto: CreateTaskDto = {
        title: "New Task",
        userId: "2",
        dueDate: new Date(),
      };

      jest.spyOn(prismaService.task, "create").mockResolvedValue(mockTask);

      const result = await service.create(createTaskDto);
      expect(result).toEqual(mockTask);
      expect(prismaService.task.create).toHaveBeenCalledWith({ data: createTaskDto });
    });

    it("should throw an error if task is not created", async () => {
      jest.spyOn(prismaService.task, "create").mockResolvedValue(null);

      await expect(service.create({} as CreateTaskDto)).rejects.toThrow(
        new HttpException("Task not created", HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });

  describe("findAll", () => {
    it("should return paginated tasks", async () => {
      jest.spyOn(prismaService.task, "count").mockResolvedValue(1);
      jest.spyOn(prismaService.task, "findMany").mockResolvedValue([mockTask]);

      const result = await service.findAll(10, 1, "2");
      expect(result).toEqual({
        data: [mockTask],
        total: 1,
        limit: 10,
        page: 1,
      });
    });
  });

  describe("findOne", () => {
    it("should return a task by id", async () => {
      jest.spyOn(prismaService.task, "findUnique").mockResolvedValue(mockTask);

      const result = await service.findOne("1");
      expect(result).toEqual(mockTask);
      expect(prismaService.task.findUnique).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });

    it("should throw an error if task is not found", async () => {
      jest.spyOn(prismaService.task, "findUnique").mockResolvedValue(null);

      await expect(service.findOne("1")).rejects.toThrow(
        new HttpException("Task not found", HttpStatus.NOT_FOUND),
      );
    });
  });

  describe("update", () => {
    it("should update a task", async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: "Updated Task",
        userId: "2",
      };

      jest.spyOn(prismaService.task, "findUnique").mockResolvedValue(mockTask);
      jest.spyOn(prismaService.task, "update").mockResolvedValue(mockTask);

      const result = await service.update("1", updateTaskDto);
      expect(result).toEqual(mockTask);
      expect(prismaService.task.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: updateTaskDto,
      });
    });

    it("should throw an error if task is not found", async () => {
      jest.spyOn(prismaService.task, "findUnique").mockResolvedValue(null);

      await expect(service.update("1", {} as UpdateTaskDto)).rejects.toThrow(
        new HttpException("Task not found", HttpStatus.NOT_FOUND),
      );
    });
  });

  describe("remove", () => {
    it("should delete a task", async () => {
      jest.spyOn(prismaService.task, "findUnique").mockResolvedValue(mockTask);
      jest.spyOn(prismaService.task, "delete").mockResolvedValue(mockTask);

      const result = await service.remove("1", "2");
      expect(result).toEqual("Task deleted");
      expect(prismaService.task.delete).toHaveBeenCalledWith({
        where: { id: "1" },
      });
    });

    it("should throw an error if task is not found", async () => {
      jest.spyOn(prismaService.task, "findUnique").mockResolvedValue(null);

      await expect(service.remove("1", "2")).rejects.toThrow(
        new HttpException("Task not found", HttpStatus.NOT_FOUND),
      );
    });
  });

  describe("sendTaskReminder", () => {
    it("should send task reminder email", async () => {
      jest.spyOn(mailer, "mailer").mockResolvedValue(null);
      await service.sendTaskReminder("user@example.com", "Test Task", new Date());

      expect(mailer).toHaveBeenCalledWith(
        "user@example.com",
        "Task Reminder: Test Task",
        expect.stringContaining("Your task \"Test Task\" is nearing its deadline."),
      );
    });
  });

  describe("findTasksNearDueDate", () => {
    it("should find tasks near due date", async () => {
      const nearDueTask = { ...mockTask, dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000) };
      jest.spyOn(prismaService.task, "findMany").mockResolvedValue([nearDueTask]);
      jest.spyOn(service, "sendTaskReminder").mockResolvedValue(null);

      await service.findTasksNearDueDate();

      expect(service.sendTaskReminder).toHaveBeenCalledWith(nearDueTask.user.email, nearDueTask.title, nearDueTask.dueDate);
    });
  });
});
