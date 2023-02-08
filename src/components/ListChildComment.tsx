import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  callGetCommentApi,
  IComment,
  IGetCommentResponse,
  IPostModel,
  IVoteComment,
} from "../apis";
import { Comment } from "../components";
import { setLoading } from "../redux/main";

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

  const handleVoteComment = (v: IVoteComment) => {
    const newRecords = comments.records.map((comment) => {
      if (comment._id === v.commentId) {
        return { ...comment, vote: v.vote };
      }

      return comment;
    });
    setComments({ ...comments, records: newRecords });
  };

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
          comments.records.map((com, index) => {
            return (
              <Comment
                key={`${com._id}${index}`}
                comment={com}
                post={post}
                commentSuccess={commentSuccess}
                voteCommentSuccess={handleVoteComment}
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
