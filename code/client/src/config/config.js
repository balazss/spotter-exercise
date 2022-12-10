// Get the environment variables
const env = process.env.NODE_ENV || "development";
const apiHost = process.env.REACT_APP_API_HOST || "localhost:4000";
const protocol = window.location.protocol || "http";

export { apiHost, env, protocol };
