"use client";
export const SERVER_URL: string = "http://localhost:3333";

const version: string = "/api/v1";
export const URLS = {
  AUTH: version + "/auths",
  USERS: version + "/users",
  TASK: version + "/task",
};
