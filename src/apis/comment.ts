import axios from "axios";
import queryString from "query-string";
import { BASE_HOST } from ".";

export interface IComment {
  _id?: string;
  postId?: string;
  postInfo?: {
    _id: string;
    title: string;
    content: string;
  };
  childCommentIds: string[];
  userId?: string;
  userInfo: {
    _id?: string;
    email?: string;
  };
  comment?: string;
  replyToCommentId?: string;
  level?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateCommentRequest {
  postId: string;
  comment: string;
  replyToCommentId?: string;
}

export const callCreateCommentApi = async (body: ICreateCommentRequest) => {
  const accessToken = localStorage.getItem("accessToken");

  const result: any = await axios.post(`${BASE_HOST}/api/comment`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return result.data.data as IComment;
};

export interface IGetCommentRequest {
  postId: string;
  page?: number;
  limit?: number;
  commentId?: string;
}

export interface IGetCommentResponse {
  records: IComment[];
  metadata?: {
    totalPage: number;
    totalRecord: number;
    currentPage: number;
    limit: number;
  };
}

export const callGetCommentApi = async (body: IGetCommentRequest) => {
  const result: any = await axios.get(
    `${BASE_HOST}/api/comment?${queryString.stringify(body)}`
  );

  return result.data.data as IGetCommentResponse;
};
