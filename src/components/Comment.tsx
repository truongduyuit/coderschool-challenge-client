import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { Action } from "@remix-run/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IComment, IPostModel, VoteAction } from "../apis";
import {
  callCreateOrUpdateVoteComment,
  IVoteComment,
} from "../apis/voteComment";
import { ErrorMessages, MAX_COMMENT_LEVEL } from "../configs";
import { useToast } from "../hooks";
import { setLoading } from "../redux/main";
import { RootState } from "../redux/store";
import { AddComment } from "./AddComment";
import { ListChildComment } from "./ListChildComment";
import { ShowMoreContent } from "./ShowMoreContent";

interface Props {
  comment: IComment;
  post: IPostModel;
  commentSuccess?: (newComment: IComment) => void;
  voteCommentSuccess?: (vote: IVoteComment) => void;
}

export const Comment = ({
  comment,
  post,
  commentSuccess,
  voteCommentSuccess,
}: Props) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [openReplyForm, setOpenReplyForm] = useState(false);
  const [openViewReply, setOpenViewReply] = useState(false);
  const [currentVote, setCurrentVote] = useState<VoteAction>(
    comment?.vote || VoteAction.normal
  );

  const userId = useSelector((state: RootState) => state.user.userId);

  const handleVoteComment = async (voteAction: VoteAction) => {
    try {
      if (comment && comment._id) {
        // if logged in, call api
        // else saved to localStorage
        if (userId) {
          dispatch(setLoading(true));

          const voteComment = await callCreateOrUpdateVoteComment({
            commentId: comment._id,
            vote: voteAction,
          });

          voteCommentSuccess?.(voteComment);

          setCurrentVote(voteAction);
        } else {
          // will handle after login in feature
          let newVoteComment = {
            [comment._id]: Action,
          };

          const voteComment = localStorage.getItem("voteComment");
          if (voteComment) {
            const objVoteComment = JSON.parse(voteComment);
            if (typeof objVoteComment === "object") {
              newVoteComment = { ...objVoteComment, ...newVoteComment };
            }
          }

          localStorage.setItem("voteComment", JSON.stringify(newVoteComment));
        }
      }
    } catch (error: any) {
      showToast({
        alertType: "error",
        message: ErrorMessages[error.response.data.code as string],
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Card className="border-4 border-red-200 my-3">
        <CardHeader
          action={
            <Box className="flex flex-row items-center">
              {comment.createdAt && new Date(comment.createdAt).toDateString()}
            </Box>
          }
          title={comment.userInfo.email}
        />

        <CardContent sx={{ minHeight: 50 }}>
          {comment.comment && <ShowMoreContent content={comment.comment} />}
        </CardContent>
        <CardActions>
          <IconButton
            aria-label="Like"
            color={currentVote === VoteAction.upvote ? "primary" : "default"}
            onClick={() => handleVoteComment(VoteAction.upvote)}
          >
            <ThumbUpIcon />
          </IconButton>
          <IconButton
            aria-label="Dislike"
            color={currentVote === VoteAction.downvote ? "primary" : "default"}
            onClick={() => handleVoteComment(VoteAction.downvote)}
          >
            <ThumbDownAltIcon />
          </IconButton>

          {comment?.level !== undefined &&
            comment.level < MAX_COMMENT_LEVEL && (
              <Button
                aria-label="comments"
                //   color={voteAction === VoteAction.downvote ? "primary" : "default"}
                onClick={() => setOpenViewReply(true)}
              >
                {`${comment.childCommentIds.length} comments`}
              </Button>
            )}

          <Button size="small" onClick={() => setOpenReplyForm(true)}>
            Reply
          </Button>
        </CardActions>
      </Card>

      <AddComment
        key={`${post._id}_${comment._id}`}
        open={openReplyForm}
        post={post}
        onClose={() => setOpenReplyForm(false)}
        commentSuccess={commentSuccess}
        comment={comment}
      />

      <ListChildComment
        open={openViewReply}
        comment={comment}
        onClose={() => setOpenViewReply(false)}
        post={post}
      />
    </>
  );
};
