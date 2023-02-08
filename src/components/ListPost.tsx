import {
  callGetPostsApi,
  IGetPostsResponse,
  IPostModel,
  IVote,
  VoteAction,
} from "../apis";

import { List } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/main";
import { PostItem } from "./PostItem";
import Box from "@mui/material/Box/Box";
import { RootState } from "../redux/store";

export const ListPost = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<IGetPostsResponse>({
    records: [],
  });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const keywords = useSelector((state: RootState) => state.app.keywords);

  useEffect(() => {
    handleScrollPost(true);
  }, [keywords]);

  useEffect(() => {
    handleScrollPost(false);
  }, [page]);

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

  // const votePostSuccess = (v: IVote) => {
  //   const newRecords = posts.records.map((post) => {
  //     if (post._id === v.postId) {
  //       let newUpVotes = post.upvotes;
  //       let newDownVotes = post.downvotes;

  //       if (v.vote === VoteAction.upvote) {
  //         newUpVotes = newUpVotes ? newUpVotes++ : 1;

  //         if (post.vote) {
  //           newDownVotes = newDownVotes ? newDownVotes-- : 0;
  //         }
  //       } else {
  //         newDownVotes = newDownVotes ? newDownVotes++ : 1;

  //         if (post.vote) {
  //           newUpVotes = newUpVotes ? newDownVotes-- : 0;
  //         }
  //       }

  //       return { ...post, vote: v.vote };
  //     }

  //     return post;
  //   });

  //   setPosts({ ...posts, records: newRecords });
  // };

  return (
    <>
      <Box className="border-b-2 my-3" textAlign="center" component="h1">
        <b>Post List</b>
      </Box>
      {posts.records.length ? (
        posts.records.map((post: IPostModel) => {
          return (
            <PostItem
              key={post._id}
              post={post}
              // onVotePostSuccess={votePostSuccess}
            />
          );
        })
      ) : (
        <Box textAlign="center">This post has no comments yet</Box>
      )}
    </>
  );
};
