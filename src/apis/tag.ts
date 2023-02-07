import axios from "axios";
import { BASE_HOST } from ".";
import queryString from "query-string";

export const callFetchTags = async (limit?: number) => {
  const result = await axios.get(
    `${BASE_HOST}/api/tag?${queryString.stringify(
      { limit },
      { skipNull: false }
    )}`
  );
  return result.data.data as string[];
};
