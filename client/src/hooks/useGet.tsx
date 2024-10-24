import { useQuery } from "@tanstack/react-query";
import API from "@/utils/API";

const useGet = (qkey: string, urls: string, id: string) => {
  const { isError, isLoading, data } = useQuery({
    queryKey: [qkey, id],
    queryFn: async () => {
      const { data } = await API.get(`${urls}/${id}`);

      return data;
    },
  });
  return { isError, isLoading, data };
};

export default useGet;
