require("./config/dotenv.config");
const app = require("./app");
const http = require("http").createServer(app);

http.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});