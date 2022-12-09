// Get the environment variables
const env = process.env.NODE_ENV || "development";
const apiHost = process.env.REACT_APP_API_HOST || "http://localhost:4000";

export { apiHost, env };
