import { UserStore } from "@/store/UserStore";
import API from "@/utils/API";
import { useMutation } from "@tanstack/react-query";
import { URLS } from "@/constants";

type loginPayload = {
  email: string;
  password: string;
};

export const useLogin: any = () => {
  const { setIsLoggedIn } = UserStore((state) => state);

  const {
    mutateAsync: loginMutation,
    isSuccess,
    data,
    isError,
  } = useMutation({
    mutationFn: async (payload: loginPayload) => {
      let { email, password } = payload;
      const { data } = await API.post(URLS.AUTH + "/login", {
        email,
        password,
      });
      return data;
    },
    onSuccess: (data: any) => {
      setIsLoggedIn(data);
    },
  });

  return { loginMutation, isSuccess, isError };
};
