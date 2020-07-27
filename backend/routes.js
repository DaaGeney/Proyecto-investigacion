const gamificationComponent = require("./routes/components");
const learningObjetives = require("./routes/learningObjetives");
const subjectMatter = require("./routes/subjectMatter")
const experience = require("./routes/experience")
const auth = require("./routes/auth")
const file = require("./routes/files")


module.exports = app => {
  app.use(gamificationComponent);
  app.use(learningObjetives);
  app.use(subjectMatter);
  app.use(experience);
  app.use(auth)
  app.use('/file', file);

};