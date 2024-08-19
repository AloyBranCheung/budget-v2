import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";

export default function useAxios(axiosFn: () => Promise<AxiosResponse>) {
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosFn();
        setData(result.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    };

    setIsError(false);
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, [axiosFn]);

  return { data, isLoading, isError };
}
