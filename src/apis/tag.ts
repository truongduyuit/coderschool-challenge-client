import axios from "axios";
import { BASE_HOST } from ".";

export const callFetchTags = async (limit?: number) => {
  const result = await axios.get(`${BASE_HOST}/api/tag?limit=${limit}`);
  return result.data.data as string[];
};
