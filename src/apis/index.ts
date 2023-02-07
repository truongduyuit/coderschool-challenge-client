export const BASE_HOST =
  process.env.REACT_APP_BASE_HOST || "http://localhost:1999";

export enum RecordStatus {
  active = "active",
  deleted = "deleted",
}

export * from "./auth";
export * from "./post";
export * from "./tag";
export * from "./vote";
export * from "./comment";
