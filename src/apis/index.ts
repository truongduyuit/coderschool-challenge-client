export const BASE_HOST =
  process.env.REACT_APP_BASE_HOST || "http://localhost:1999";

export enum RecordStatus {
  active = "active",
  deleted = "deleted",
}

export enum VoteAction {
  upvote = 1,
  downvote = -1,
  normal = 0,
}

export * from "./auth";
export * from "./post";
export * from "./tag";
export * from "./vote";
export * from "./comment";
export * from "./voteComment";
