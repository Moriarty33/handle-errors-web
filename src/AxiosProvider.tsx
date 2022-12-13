import * as Sentry from "@sentry/react";
import axios, { AxiosResponse, isAxiosError } from "axios";
import React, { useEffect } from "react";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";

interface AxiosProviderProps {
  children: React.ReactNode;
}

export const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {
  const auth = { token: "" };

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      if (auth.token) {
        config.headers = {
          ...config.headers,
          Authorization: `Token ${auth.token}`,
        };
      }

      return config;
    });
  }, [auth.token]);

  useEffect(() => {
    axios.interceptors.response.use(
      (res) => res,
      (e) => {
        if (isAxiosError(e) && e.response) {
          const { status } = e.response as AxiosResponse;

          if (status === 401) {
            // auth.logOut();
            Sentry.captureException(e);
            return Promise.reject(e);
          }
        }
        Sentry.captureException(e);
        return Promise.reject(e);
      }
    );
  }, []);

  return <>{children}</>;
};
