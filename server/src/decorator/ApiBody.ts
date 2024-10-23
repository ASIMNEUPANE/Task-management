import { ApiBody } from "@nestjs/swagger";

export const ApiFile =
  (fileName: string = "files"): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: "object",
        properties: {
          [fileName]: {
            type: "array",
            items: {
              type: "string",
              format: "binary",
            },
          },
          title: {
            type: "string",
            description: "Title of the Task",
            example: "Homework",
          },
          description: {
            type: "string",
            description: "Description of the Task",
            example: "It's a homework",
          },

          dueDate: {
            type: "date",
            description: "Due date of the Task",
            example: "2021-09-01",
          },
          isCompleted: {
            type: "boolean",
            description: "Is the task completed",
            example: "false",
          },
          // userId: {
          //   type: "string",
          //   description: "User who created the task",
          //   example: "123456",
          // },
        },
        required: ["title", "dueDate", "isCompleted"],
      },
    })(target, propertyKey, descriptor);
  };
