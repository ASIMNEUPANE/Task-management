import API from "../utils/API";
import { URLS } from "../constants";

type loginPayload = {
  email: string;
  password: string;
};
export const login = async (payload: loginPayload) => {
  console.log(payload, "authservice");
  return await API.post(URLS.AUTH + "/login", { payload });
};
