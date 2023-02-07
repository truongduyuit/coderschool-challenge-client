import axios from "axios";
import { BASE_HOST } from ".";

export interface ILoginRegisterRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 *
 * @param body email, password
 * @returns
 */
export const callLoginApi = async (body: ILoginRegisterRequest) => {
  const result: any = await axios.post(`${BASE_HOST}/api/user/signin`, body);

  return result.data.data as ILoginResponse;
};

/**
 *
 * @param body email, password
 */
export const callRegisterApi = async (body: ILoginRegisterRequest) => {
  await axios.post(`${BASE_HOST}/api/user/signup`, body);
};
