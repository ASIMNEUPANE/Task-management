import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate,
  IsBoolean,
} from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "Title of the Task",
  })
  @IsString()
  title: string;

  @IsOptional()
  @ApiProperty({
    description: "Description of the Task",
  })
  @IsString()
  description?: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "Is the task completed",
  })
  @IsBoolean()
  isCompleted: boolean;

  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: "Attachment of the Task",
    type: File,
    properties: {
      attachment: {
        type: "string",
        format: "binary",
      },
    },
  })
  @IsOptional()
  attachment: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "User who created the task",
  })
  @IsString()
  @IsOptional()
  userId: string;
}

export interface taskType {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  attachment: string;
  userId: string;
}
