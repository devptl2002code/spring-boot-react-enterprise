import { useQuery } from "@tanstack/react-query";
import { api } from "@core/api/axios";

export const TestQueryPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      const res = await api.get("/your-test-endpoint");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return <div>{JSON.stringify(data)}</div>;
};