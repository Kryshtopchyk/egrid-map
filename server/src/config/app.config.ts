export default () => ({
  port: process.env.APP_PORT,
  name: process.env.APP_NAME,
  version: process.env.APP_VERSION,
  mongoUri: process.env.MONGO_URI,
});
