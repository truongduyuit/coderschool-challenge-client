import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { IPostModel } from "../apis";
import { ShowMoreContent } from "./ShowMoreContent";
import { useNavigate } from "react-router-dom";

type Props = {
  post: IPostModel;
};

export const PostItem = ({ post }: Props) => {
  const navigator = useNavigate();

  return (
    <Card className="border-4 border-red-200 my-3">
      <CardHeader
        className="cursor-pointer"
        action={
          <Box className="flex flex-row items-center ">
            {post.createdAt && new Date(post.createdAt).toDateString()}
          </Box>
        }
        title={post.userInfo.email}
        onClick={() => navigator(`/post/detail?id=${post._id}`)}
      />

      <CardContent sx={{ minHeight: 50 }}>
        {post.content && <ShowMoreContent content={post.content} />}
      </CardContent>
    </Card>
  );
};
