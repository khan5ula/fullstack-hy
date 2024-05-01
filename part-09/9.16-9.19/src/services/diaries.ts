import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = () => {
  const request = axios.get<DiaryEntry[]>(`${apiBaseUrl}/diaries`);
  return request.then((response) => response.data);
};

const create = async (newDiary: NewDiaryEntry) => {
  const response = await axios.post(`${apiBaseUrl}/diaries`, newDiary);
  return response.data;
};

export default { getAll, create };
