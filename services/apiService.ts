import axios from "axios";

const BASE_URL = "https://app.onemor.com/api";
const AUTH_TOKEN = process.env.EXPO_PUBLIC_AUTH_TOKEN;

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