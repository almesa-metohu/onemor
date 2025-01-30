import axios from "axios";

const BASE_URL = "https://app.onemor.com/api";
const AUTH_TOKEN = "1229|HA5ttrW9wpncj6K4gw0oWTziqKnsObc6hQQCJ1jg36ba5ca1";

export const API_CONFIG = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: API_CONFIG.headers,
});

export const fetchWorkoutFeed = async (page: number) => {
  try {
    const response = await api.get(`/workout-feed?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching workout feed:", error);
    throw error;
  }
};

export const getAuthenticatedUrl = (url: string) => {
  return {
    uri: url,
    headers: API_CONFIG.headers
  };
};