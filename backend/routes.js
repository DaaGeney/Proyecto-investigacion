const gamificationComponent = require("./routes/gamificationComponent");
const traditionalComponent = require("./routes/traditionalComponent");


module.exports = app => {
  app.use(gamificationComponent);
  app.use(traditionalComponent)
};