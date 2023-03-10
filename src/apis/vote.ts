import axios from "axios";
import { BASE_HOST, VoteAction } from ".";

export interface IVote {
  postId: string;
  postInfo: {
    _id: string;
    title: string;
    content: string;
  };
  vote: VoteAction;
  userId: string;
  userInfo: {
    _id: string;
    email: string;
  };
}

export interface ICheckVoteRequest {
  postId: string;
}

export interface ICreateVoteRequest extends ICheckVoteRequest {
  vote: VoteAction;
}

export const callCreateOrUpdateVote = async (body: ICreateVoteRequest) => {
  const accessToken = localStorage.getItem("accessToken");
  const result: any = await axios.post(`${BASE_HOST}/api/vote/`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return result.data.data as IVote;
};

export const callCheckVote = async (body: ICheckVoteRequest) => {
  const accessToken = localStorage.getItem("accessToken");
  const result: any = await axios.post(`${BASE_HOST}/api/vote/check`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return result.data.data as VoteAction;
};
