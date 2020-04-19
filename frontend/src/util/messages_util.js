import axios from "axios";

export const getConversations = (id) => {
  return axios.get(`/messages/conversations/${id}`);
};
