import axios from "axios";
import queryString from "query-string";
import { BASE_HOST, RecordStatus } from ".";

export interface IPostModel {
  _id: string;
  title: string;
  content?: string;
  tags: string[];
  userId: string;
  userInfo: {
    _id: string;
    email: string;
  };
  status: RecordStatus;
  createdAt?: Date;
}

export interface ICreatePostRequest {
  title: string;
  content?: string;
  selectedTags: string[];
}

export const callCreatePost = async (body: ICreatePostRequest) => {
  const accessToken = localStorage.getItem("accessToken");

  const result: any = await axios.post(`${BASE_HOST}/api/post`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return result.data.data as IPostModel;
};

export const callGetPostById = async (id: string) => {
  const result: any = await axios.get(`${BASE_HOST}/api/post/${id}`);
  return result.data.data as IPostModel;
};

export const callDeletePost = async (id: string) => {
  const accessToken = localStorage.getItem("accessToken");

  await axios.delete(`${BASE_HOST}/api/post/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export interface IGetPostsRequest {
  page?: number;
  limit?: number;
  tags?: string[];
  sortType?: "latest" | "oldest";
}
export interface IGetPostsResponse {
  records: IPostModel[];
  metadata?: {
    totalPage: number;
    totalRecord: number;
    currentPage: number;
    limit: number;
  };
}

export const callGetPostsApi = async (body: IGetPostsRequest) => {
  const result: any = await axios.get(
    `${BASE_HOST}/api/post?${queryString.stringify(body, { skipNull: false })}`
  );

  return result.data.data as IGetPostsResponse;
};
