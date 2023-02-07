import { callGetPostsApi, IGetPostsResponse, IPostModel } from "../apis";

import { List } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/main";
import { PostItem } from "./PostItem";
import Box from "@mui/material/Box/Box";

type Props = {
  keywords?: string[];
};

export const ListPost = ({ keywords }: Props) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<IGetPostsResponse>({
    records: [],
  });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    handleScrollPost(keywords?.length ? true : false);
  }, [keywords, page]);

  useEffect(() => {
    handleScrollPost();
  }, []);

  const handleScrollPost = (reset?: boolean) => {
    dispatch(setLoading(true));

    callGetPostsApi({
      page,
      limit,
      ...(keywords?.length && { tags: keywords }),
    })
      .then((data) =>
        reset
          ? setPosts(data)
          : setPosts({
              metadata: data.metadata,
              records: [...posts?.records, ...data.records],
            })
      )
      .finally(() => dispatch(setLoading(false)));
  };

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (
          posts.metadata &&
          Number(posts.metadata.totalPage) -
            Number(posts.metadata.currentPage) >
            1
        ) {
          setPage(page + 1);
        }
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts]);

  return (
    <>
      <Box className="border-b-2 my-3" textAlign="center" component="h1">
        <b>Article List</b>
      </Box>
      {posts.records.length ? (
        posts.records.map((post: IPostModel) => {
          return <PostItem key={post._id} post={post} />;
        })
      ) : (
        <Box textAlign="center">This post has no comments yet</Box>
      )}
    </>
  );
};
