import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { callCreateCommentApi, IComment, IPostModel } from "../apis";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/main";
import { useToast } from "../hooks";
import { ErrorMessages } from "../configs";
import { RootState } from "../redux/store";

type Props = {
  open: boolean;
  onClose?: () => void;
  post: IPostModel;
  comment?: IComment;
  commentSuccess?: (newComment: IComment) => void;
};

export const AddComment = ({
  open,
  onClose,
  comment,
  post,
  commentSuccess,
}: Props) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [content, setContent] = useState<string>("");
  const email = useSelector((state: RootState) => state.user.email);

  const handleComment = async function () {
    try {
      dispatch(setLoading(true));

      const newComment = await callCreateCommentApi({
        comment: content,
        postId: post._id,
        replyToCommentId: comment?._id,
      });

      commentSuccess?.(newComment);
      setContent("");
      onClose?.();
    } catch (error: any) {
      showToast({
        alertType: "error",
        message: ErrorMessages[error.response.data.code as string],
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClose = () => {
    setContent("");
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {comment ? "Reply to comment" : `Add new comment to the post`}
      </DialogTitle>

      <DialogContent style={{ minWidth: 600, minHeight: 300 }}>
        <MDEditor
          id="content"
          className="w-full my-4"
          style={{
            width: "100%",
            height: "100%",
          }}
          value={content}
          onChange={(md) => setContent(md || "")}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button autoFocus onClick={handleComment}>
          {comment ? "Reply" : "Comment"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
