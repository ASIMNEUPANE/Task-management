import { URLS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import API from "@/utils/API";
import { useEffect } from "react";
import TaskStore from "@/store/TaskStore";

const useTask = (page: number, limit: number) => {
  const { setTask } = TaskStore((state) => state);
  const str = JSON.stringify({ page, limit });

  const qn = useQuery({
    queryKey: ["getblogs", str],
    queryFn: async () => {
      const params = {
        page: page,
        limit: limit,
      };
      const { data } = await API.get(`${URLS.TASK}/list`, { params });

      return data;
    },
    // select(data) {

    //             // },
  });

  useEffect(() => {
    if (qn.data) {
      setTask(qn.data.data);
    }
  }, [qn.data, setTask]);

  return qn;
};

export default useTask;
