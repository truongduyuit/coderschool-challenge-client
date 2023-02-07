import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { IComment, IPostModel } from "../apis";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AddComment } from "./AddComment";
import { useState } from "react";
import { ListChildComment } from "./ListChildComment";
import { MAX_COMMENT_LEVEL } from "../configs";
import { ShowMoreContent } from "./ShowMoreContent";

interface Props {
  comment: IComment;
  post: IPostModel;
  commentSuccess?: (newComment: IComment) => void;
}

export const Comment = ({ comment, post, commentSuccess }: Props) => {
  const [openReplyForm, setOpenReplyForm] = useState(false);
  const [openViewReply, setOpenViewReply] = useState(false);

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
            //   color={voteAction === VoteAction.upvote ? "primary" : "default"}
            //   onClick={() => handleVote(VoteAction.upvote)}
          >
            <ThumbUpIcon />
          </IconButton>
          <IconButton
            aria-label="Dislike"
            //   color={voteAction === VoteAction.downvote ? "primary" : "default"}
            //   onClick={() => handleVote(VoteAction.downvote)}
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
