import { RootState } from "../store/store";

export const authHeader = (): any => {
  return {
    // baseUrl: "http://localhost:8080/api/v1/dashboard",

    baseUrl: "https://data.astroyaro.com/api/v1/dashboard",

    // baseUrl:
    //   "http://astro-bharat-backend-env.eba-wu4uqupp.ap-south-1.elasticbeanstalk.com/api/v1/dashboard",

    prepareHeaders: (headers: any, { getState }: any) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  };
};
