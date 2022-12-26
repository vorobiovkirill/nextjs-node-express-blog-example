import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = (username: string, password: string) => {
    return this.instance
      .post("/login", {
        username,
        password,
      })
      .then((res) => {
        return {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          accessToken: res.data.accessToken,
        };
      });
  };

  getMe = (userId: string) => {
    return this.instance
      .get(`/users/${userId}`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return res.data;
      });
  };
}