import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import {
  callGetCommentApi,
  IComment,
  IGetCommentResponse,
  IPostModel,
} from "../apis";
import ReactMarkdown from "react-markdown";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/main";
import { Box } from "@mui/material";
import { Comment } from "../components";

type Props = {
  open: boolean;
  comment: IComment;
  post: IPostModel;
  onClose?: () => void;
  commentSuccess?: (newComment: IComment) => void;
};

export const ListChildComment = ({
  open,
  onClose,
  comment,
  post,
  commentSuccess,
}: Props) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState<IGetCommentResponse>({
    records: [],
  });
  const [commentPage, setCommentPage] = useState(0);
  const [commentLimit, setCommentLimit] = useState(5);

  useEffect(() => {
    if (!comment.postId) return;

    dispatch(setLoading(true));

    callGetCommentApi({
      postId: post._id,
      commentId: comment._id,
      limit: commentLimit,
      page: commentPage,
    }).then((data) => {
      setComments({
        metadata: data.metadata,
        records: [...comments?.records, ...data.records],
      });
      dispatch(setLoading(false));
    });
  }, [commentPage, commentLimit]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Reply to comments</DialogTitle>

      <DialogContent style={{ minWidth: 600, minHeight: 300 }}>
        {comments.records.length ? (
          comments.records.map((com) => {
            return (
              <Comment
                key={com._id}
                comment={com}
                post={post}
                // commentSuccess={commentSuccess}
              />
            );
          })
        ) : (
          <Box textAlign="center">This comment has no reply yet</Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button size="small" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};