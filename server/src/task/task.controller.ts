import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Req,
  UseGuards,
  Put,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from "@nestjs/common";
import { ApiFile } from "../decorator/ApiBody";

import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import {
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { RoleGuard } from "src/auths/guards/role.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { Task } from "@prisma/client";

@UseGuards(RoleGuard)
@Controller("task")
@ApiTags("Task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Roles("USER")
  @Post()
  @ApiOperation({ summary: "Create new task" })
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: [CreateTaskDto],
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("attachment", {
      storage: diskStorage({
        destination: "./public/task",
        filename: (req, file, cb) => {
          // Generating a unique filename
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split(".").pop();
          cb(null, `${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  )
  @ApiFile()
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: "image/jpeg" }),
          new MaxFileSizeValidator({ maxSize: 1000000 }),
        ],
        fileIsRequired: true,
      }),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    ) //@ts-expect-error
    file: Express.Multer.File,
    @Body() createTaskDto: CreateTaskDto,
    @Req() req,
  ) {
    console.log(createTaskDto);
    if (file) {
      const uniqueSuffix = Date.now() + "." + file.originalname.split(".")[1];
      createTaskDto.attachment = uniqueSuffix;
    }
    createTaskDto.userId = req.currentUser;
    console.log(createTaskDto);
    return this.taskService.create(createTaskDto);
  }

  @Roles("USER")
  @Get("/list")
  @ApiOperation({ summary: "Get all task" })
  @ApiQuery({ name: "limit", required: false, type: String })
  @ApiQuery({ name: "page", required: false, type: String })
  @ApiResponse({
    status: 200,
    description: "The found record",
    // type: [UserEntity],
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  findAll(
    @Query("limit", new DefaultValuePipe(4), ParseIntPipe) limit: number = 4,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Req() req,
  ) {
    console.log("userId", req.currentUser);
    let userId = req.currentUser;
    return this.taskService.findAll(limit, page, userId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get task by id" })
  @ApiResponse({
    status: 200,
    description: "The found record",
    // type: [Task],
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  findOne(@Param("id") id: string) {
    return this.taskService.findOne(id);
  }

  @Roles("USER")
  @Put(":id")
  @ApiOperation({ summary: "Update task" })
  @ApiResponse({
    status: 200,
    description: "The found record",
    type: [UpdateTaskDto],
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FileInterceptor("attachment", {
      storage: diskStorage({
        destination: "./public/task",
        filename: (req, file, cb) => {
          // Generating a unique filename
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split(".").pop();
          cb(null, `${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  )
  @ApiFile()
  update(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: "image/jpeg" }),
          new MaxFileSizeValidator({ maxSize: 1000000 }),
        ],
        fileIsRequired: true,
      }),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    ) //@ts-expect-error
    file: Express.Multer.File,
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req,
  ) {
    if (file) {
      const uniqueSuffix = Date.now() + "." + file.originalname.split(".")[1];
      updateTaskDto.attachment = uniqueSuffix;
      updateTaskDto.userId = req.currentUser;
    }
    return this.taskService.update(id, updateTaskDto);
  }

  @Roles("USER")
  @Delete(":id")
  @ApiOperation({ summary: "Delete task by id" })
  @ApiResponse({
    status: 200,
    description: "The found record",
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  remove(@Param("id") id: string, @Req() req) {
    let userId = req.currentUser;
    return this.taskService.remove(id, userId);
  }
}
