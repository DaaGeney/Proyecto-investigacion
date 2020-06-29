const MongoClient = require("mongodb").MongoClient;

module.exports = {
  client: MongoClient("mongodb+srv://diegoassia:diegoassia@methodologicalgamification-d7qjf.mongodb.net/MethodologicalGamification?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }),
  DBName: "MethodologicalGamification"
};