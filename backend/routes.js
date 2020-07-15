const gamificationComponent = require("./routes/components");
const learningObjetives = require("./routes/learningObjetives");
const subjectMatter = require("./routes/subjectMatter")
const experience = require("./routes/experience")


module.exports = app => {
  app.use(gamificationComponent);
  app.use(learningObjetives);
  app.use(subjectMatter);
  app.use(experience)

};