"use client";
import { SERVER_URL, URLS } from "@/constants";
import usePost from "@/hooks/usePost";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface TaskFormInputs {
  title: string;
  description?: string;
  attachment?: File;
  dueDate: string;
  isCompleted: boolean;
}

const TaskForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormInputs>();
  // const {data,error,success,postMutation} = usePost('listTask');

  const onSubmit = async (data: TaskFormInputs) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("dueDate", data.dueDate);
    formData.append("isCompleted", String(data.isCompleted));

    if (data.attachment) {
      formData.append("attachment", data.attachment);
    }

    // postMutation({urls:`${URLS.TASK}`, data:formData});

    const createTask = await axios.post(`${SERVER_URL}${URLS.TASK}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
      },
      withCredentials: true,
    });
    if (createTask) {
      alert("Task created successfully");
      router.push("/task");
    }
    // Handle form submission, e.g., sending formData to your API
    console.log([...formData]); // For debugging, you can remove this later
  };

  //   useEffect(() => {
  //     if (success) {
  //       alert('Task created successfully');
  //     }      router.push('/task');

  //   }, [data]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded"
      encType="multipart/form-data"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          {...register("title", { required: "Title is required" })}
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Task title"
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          {...register("description")}
          id="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Task description (optional)"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="attachment"
        >
          Attachment
        </label>
        <input
          {...register("attachment")}
          id="attachment"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="file"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dueDate"
        >
          Due Date
        </label>
        <input
          {...register("dueDate", { required: "Due date is required" })}
          id="dueDate"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
        />
        {errors.dueDate && (
          <p className="text-red-500 text-xs italic">
            {errors.dueDate.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="isCompleted"
        >
          Completed
        </label>
        <input
          {...register("isCompleted")}
          id="isCompleted"
          className="mr-2 leading-tight"
          type="checkbox"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
