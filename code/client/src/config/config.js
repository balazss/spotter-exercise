// Get the environment variables
const env = process.env.NODE_ENV || "development";
const apiHost = window?._env_?.REACT_APP_API_HOST
  ? window?._env_?.REACT_APP_API_HOST
  : "http://localhost:4000";

export { apiHost, env };
