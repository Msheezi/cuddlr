import axios from "axios";

export const getConversationList = (id) => {
  return axios.get(`/messages/conversations/${id}`);
};


export const getThreadByConvoId = (id)=> {
  return axios.get(`messages/conversations/threads/${id}`)
}

export const postMessage = (data)=> {
  return axios.post(`/messages/postmessage`)
}