import { useEffect, useState } from "react";

export type HttpMethod = "POST" | "GET" | "DELETE" | "PUT";
export const useFetch = (
  url: string,
  httpMethod: HttpMethod,
  bodyData?: object | undefined
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConfiguration(url, httpMethod, bodyData)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, [url, httpMethod, bodyData]);

  return { data, loading, error };
};

export const useCallbackFetch = () => {
  const call = async (
    url: string,
    httpMethod: HttpMethod,
    bodyData?: object | undefined
  ) => {
    const serverResponse = await fetchConfiguration(url, httpMethod, bodyData);
    return { result: serverResponse.status === 200 };
  };

  return { call };
};

const fetchConfiguration = (
  url: string,
  httpMethod: HttpMethod,
  bodyData?: object | undefined
) => {
  const method = httpMethod;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return fetch(url, { method, headers, body: JSON.stringify(bodyData) });
};
