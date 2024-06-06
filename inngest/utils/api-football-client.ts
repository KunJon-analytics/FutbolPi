import axios, { AxiosRequestConfig } from "axios";

import { env } from "@/env.mjs";

export type FootballClientFnError = { error: any; message: string };

export type FootballClientFn<T> = (
  path: string,
  _options?: AxiosRequestConfig<any> | undefined
) => Promise<T | FootballClientFnError>;

export const apiFootballClient = axios.create({
  baseURL: "https://v3.football.api-sports.io",
});

export const footHeaders = {
  "x-rapidapi-key": env.FOOTBALL_API_KEY,
  "x-rapidapi-host": "v3.football.api-sports.io",
};

export const getApi = async (
  path: string,
  _options?: AxiosRequestConfig<any> | undefined
) => {
  try {
    const res = await apiFootballClient.get(`/${path}`, _options);
    const data = await res.data;
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error, message: error?.message };
  }
};
