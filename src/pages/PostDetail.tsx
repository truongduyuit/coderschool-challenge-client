import DeleteIcon from "@mui/icons-material/Delete";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  callCheckVote,
  callCreateOrUpdateVote,
  callDeletePost,
  callGetCommentApi,
  callGetPostById,
  IComment,
  IGetCommentResponse,
  IPostModel,
  VoteAction,
} from "../apis";
import { Comment } from "../components";
import { AddComment } from "../components/AddComment";
import { ErrorMessages } from "../configs";
import { useToast, useViewport } from "../hooks";
import { setLoading } from "../redux/main";
import { RootState } from "../redux/store";

export const PostDetail = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get("id");
  const { showToast } = useToast();
  const userId = useSelector((state: RootState) => state.user.userId);

  const [post, setPost] = useState<IPostModel | null>();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openReplyForm, setOpenReplyForm] = useState(false);
  const [voteAction, setVoteAction] = useState<VoteAction>(VoteAction.normal);
  const [comments, setComments] = useState<IGetCommentResponse>({
    records: [],
  });
  const [commentPage, setCommentPage] = useState(0);
  const [commentLimit, setCommentLimit] = useState(5);

  useEffect(() => {
    if (postId) {
      dispatch(setLoading(true));

      callGetPostById(postId).then((data) => {
        setPost(data);
        dispatch(setLoading(false));
      });
    }
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      if (postId) {
        dispatch(setLoading(true));
        await callDeletePost(postId);
        dispatch(setLoading(false));

        showToast({
          alertType: "success",
          message: "Deleted post was successful",
        });

        setTimeout(() => {
          setPost(null);
        }, 500);
      }
    } catch (error: any) {
      showToast({
        alertType: "error",
        message: ErrorMessages[error.response.data.code as string],
      });
    } finally {
      setOpenConfirmDelete(false);
    }
  };

  useEffect(() => {
    if (userId) {
      postId && callCheckVote({ postId }).then((data) => setVoteAction(data));
    } else {
      setVoteAction(VoteAction.normal);
    }
  }, [userId]);

  const handleVote = async (vote: VoteAction) => {
    if (!postId) return;

    // new vote same old vote
    if (voteAction === vote) return;

    if (!userId) {
      showToast({
        alertType: "warning",
        message: "Must log in to like or dislike the post",
      });
      navigator(`/signin?redirect=/post/detail?id=${postId}`);
      return;
    }

    try {
      dispatch(setLoading(true));

      await callCreateOrUpdateVote({
        postId,
        vote,
      });

      setVoteAction(vote);
      dispatch(setLoading(false));
    } catch (error: any) {
      showToast({
        alertType: "error",
        message: ErrorMessages[error.response.data.code as string],
      });
    }
  };

  useEffect(() => {
    if (postId) {
      dispatch(setLoading(true));

      callGetCommentApi({
        postId,
        limit: commentLimit,
        page: commentPage,
      }).then((data) => {
        setComments({
          metadata: data.metadata,
          records: [...comments?.records, ...data.records],
        });
        dispatch(setLoading(false));
      });
    }
  }, [commentPage, commentLimit]);

  const commentSuccess = (newComment: IComment) => {
    const { replyToCommentId } = newComment;
    if (replyToCommentId) {
      const parentComment = comments.records.find(
        (comment) => comment._id === replyToCommentId
      );

      if (parentComment && newComment._id) {
        parentComment.childCommentIds.push(newComment._id);
      }
      setComments({ ...comments, records: [...comments?.records] });
    } else {
      setComments({ ...comments, records: [newComment, ...comments?.records] });
    }
  };

  const handleLoadMoreComment = async () => {
    setCommentPage(commentPage + 1);
  };

  return (
    <>
      <Container maxWidth="lg">
        {post !== null ? (
          <Box
            sx={{
              pb: 1,
              pt: 3,
            }}
          >
            <Card className="border-8 border-red-400" color="primary">
              <CardHeader
                action={
                  post?.userId === userId && (
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => setOpenConfirmDelete(true)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )
                }
                title={post?.title}
                subheader={post?.userInfo.email}
              />

              <CardContent sx={{ minHeight: 250 }}>
                {post?.content && <ReactMarkdown children={post.content} />}
                <Stack direction="row" spacing={1}>
                  {post?.tags.map((tag) => {
                    return (
                      <Chip
                        label={tag}
                        component="a"
                        href="#basic-chip"
                        variant="outlined"
                        clickable
                      />
                    );
                  })}
                </Stack>
              </CardContent>
              <CardActions className="flex flex-row justify-end">
                <IconButton
                  aria-label="Like"
                  color={
                    voteAction === VoteAction.upvote ? "primary" : "default"
                  }
                  onClick={() => handleVote(VoteAction.upvote)}
                >
                  <ThumbUpIcon />
                </IconButton>
                <IconButton
                  aria-label="Dislike"
                  color={
                    voteAction === VoteAction.downvote ? "primary" : "default"
                  }
                  onClick={() => handleVote(VoteAction.downvote)}
                >
                  <ThumbDownAltIcon />
                </IconButton>

                <Button size="small" onClick={() => setOpenReplyForm(true)}>
                  Comment
                </Button>
              </CardActions>
            </Card>
          </Box>
        ) : (
          <PostNotFound />
        )}

        <Box className="border-b-2 my-3" textAlign="center" component="h1">
          <b>COMMENTS</b>
        </Box>

        {post && comments.records.length ? (
          comments.records.map((com) => {
            return (
              <Comment
                key={com._id}
                comment={com}
                post={post}
                commentSuccess={commentSuccess}
              />
            );
          })
        ) : (
          <Box textAlign="center">This post has no comments yet</Box>
        )}

        {comments.metadata &&
          comments.metadata?.currentPage < comments.metadata?.totalPage - 1 && (
            <Box
              className="w-full flex flex-row justify-end my-3 underline"
              textAlign="center"
              component="button"
              color="blue"
              onClick={handleLoadMoreComment}
            >
              Load more comments
            </Box>
          )}
      </Container>

      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete?
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)}>Disagree</Button>
          <Button onClick={handleDeletePost} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {post && (
        <AddComment
          open={openReplyForm}
          onClose={() => setOpenReplyForm(false)}
          post={post}
          commentSuccess={commentSuccess}
        />
      )}
    </>
  );
};

const PostNotFound = () => {
  const navigator = useNavigate();
  const { isMobile } = useViewport();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={isMobile ? 12 : 6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The post you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={() => navigator("/")}>
              Back Home
            </Button>
          </Grid>
          {!isMobile && (
            <Grid xs={6}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                width={500}
                height={250}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};
