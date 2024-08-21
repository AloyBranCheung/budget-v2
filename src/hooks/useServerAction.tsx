import { useState, useEffect } from "react";

export default function useServerAction(serverAction: () => Promise<string>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setIsData] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      try {
        const fetchedData = await serverAction();
        if (!fetchedData)
          throw new Error("No data returned from server action");
        setIsData(JSON.parse(fetchedData));
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    fetchData();
  }, [serverAction]);

  return { isLoading, isError, data };
}
