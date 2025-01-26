import axios from "axios";

const API_URL = "https://app.onemor.com/api/workout-feed";
// const BEARER_TOKEN = '1229|HA5ttrW9wpncj6K4gw0oWTziqKnsObc6hQQCJ1jg36ba5ca1';

console.log(
  "process.env.EXPO_PUBLIC_API_BEARER_TOKEN",
  process.env.EXPO_PUBLIC_API_BEARER_TOKEN
);

export const fetchWorkoutFeed = async (page: number) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer 1229|HA5ttrW9wpncj6K4gw0oWTziqKnsObc6hQQCJ1jg36ba5ca1`,
      },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching workout feed:", error);
    throw error;
  }
};
