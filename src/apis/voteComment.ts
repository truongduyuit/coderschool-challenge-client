import axios from "axios";
import { BASE_HOST, RecordStatus, VoteAction } from ".";

export interface IVoteComment {
  commentId: string;
  commentInfo: {
    _id: string;
    comment: string;
  };

  userId: string;
  userInfo: {
    _id: string;
    email: string;
  };
  vote: VoteAction;
  status: RecordStatus;
}

export interface ICreateVoteCommentRequest {
  commentId: string;
  vote: VoteAction;
}

export const callCreateOrUpdateVoteComment = async (
  body: ICreateVoteCommentRequest
) => {
  const accessToken = localStorage.getItem("accessToken");
  const result: any = await axios.post(`${BASE_HOST}/api/vote-comment`, body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return result.data.data as IVoteComment;
};
