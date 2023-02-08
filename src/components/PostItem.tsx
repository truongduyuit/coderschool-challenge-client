import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callCreateOrUpdateVote, IPostModel, VoteAction } from "../apis";
import { ErrorMessages } from "../configs";
import { useToast } from "../hooks";
import { setLoading } from "../redux/main";
import { RootState } from "../redux/store";
import { IVote } from "./../apis/vote";
import { ListTags } from "./ListTags";
import { ShowMoreContent } from "./ShowMoreContent";

type Props = {
  post: IPostModel;
  onVotePostSuccess?: (vote: IVote) => void;
};

export const PostItem = ({ post, onVotePostSuccess }: Props) => {
  const { postId, createdAt, content, userInfo, comments, tags } = post;
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const userId = useSelector((state: RootState) => state.user.userId);
  const [currentVote, setCurrentVote] = useState<VoteAction>(
    post?.vote || VoteAction.normal
  );
  const [currentUpVotes, setCurrentUpVotes] = useState<number>(
    post?.upvotes || 0
  );

  const [currentDownVotes, setCurrentDownVotes] = useState<number>(
    post?.downvotes || 0
  );

  const handleVote = async (voteAction: VoteAction) => {
    if (currentVote === voteAction) return;

    try {
      if (userId) {
        dispatch(setLoading(true));

        const votePost = await callCreateOrUpdateVote({
          postId: post.postId,
          vote: voteAction,
        });

        if (voteAction === VoteAction.upvote) {
          setCurrentUpVotes(currentUpVotes + 1);

          if (post.vote) {
            setCurrentDownVotes(currentDownVotes - 1);
          }
        } else if (VoteAction.downvote) {
          setCurrentDownVotes(currentDownVotes + 1);

          if (post.vote) {
            setCurrentUpVotes(currentUpVotes - 1);
          }
        }

        onVotePostSuccess?.(votePost);
        setCurrentVote(voteAction);
      } else {
        // will handle after login in feature
        let newVoteComment = {
          [post._id]: voteAction,
        };

        const voteComment = localStorage.getItem("voteComment");
        if (voteComment) {
          const objVoteComment = JSON.parse(voteComment);
          if (typeof objVoteComment === "object") {
            newVoteComment = { ...objVoteComment, ...newVoteComment };
          }
        }

        localStorage.setItem("votePost", JSON.stringify(newVoteComment));
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
    <Card className="border-4 border-red-200 my-3">
      <CardHeader
        className="cursor-pointer"
        action={
          <Box className="flex flex-row items-center ">
            {createdAt && new Date(createdAt).toLocaleString()}
          </Box>
        }
        title={`Author: ${userInfo?.email || "anonymous"}`}
        onClick={() => navigator(`/post/detail?id=${postId}`)}
      />

      <CardContent sx={{ minHeight: 50 }}>
        {content && <ShowMoreContent content={content} />}

        <ListTags tags={tags} />
      </CardContent>

      <CardActions>
        <Stack direction="row" spacing={2}>
          <Button className="mx-20">{`${comments || 0} comments`}</Button>

          <Badge badgeContent={currentUpVotes} color="primary" max={999}>
            <IconButton
              aria-label="Like"
              color={currentVote === VoteAction.upvote ? "primary" : "default"}
              onClick={() => handleVote(VoteAction.upvote)}
            >
              <ThumbUpIcon />
            </IconButton>
          </Badge>

          <Badge badgeContent={currentDownVotes} color="primary" max={999}>
            <IconButton
              aria-label="Dislike"
              color={
                currentVote === VoteAction.downvote ? "primary" : "default"
              }
              onClick={() => handleVote(VoteAction.downvote)}
            >
              <ThumbDownAltIcon />
            </IconButton>
          </Badge>
        </Stack>
      </CardActions>
    </Card>
  );
};
