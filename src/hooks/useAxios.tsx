import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";

export default function useAxios(axiosFn: () => Promise<AxiosResponse>) {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        const result = await axiosFn();
        setData(result.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [axiosFn]);

  return { data, isLoading, isError };
}
