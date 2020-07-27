const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helpers");
var ObjectId = require('mongodb').ObjectID;

const collection = "Experience"


function createExperience(req, res) {
  const { name, description, subjectMatter, data} = req.body

  
  let fun = (DB) =>
    DB
      .collection(collection)
      .update({ name },
        { $setOnInsert: { description,subjectMatter,data } },
        { upsert: true },
        (err, item) => {
          if (err) throw err;
          if (item.result.upserted) {
            res.status(201).send({
              status: true,
              data: { name, description, subjectMatter, data },
              message: "Experiencia creada correctamente",
            });
          } else {
            res.status(404).send({
              status: false,
              data: [],
              message: "Experiencia existente",
            });
          }
        }
      );
  if (isThereAnyConnection(client)) {
    const DB = client.db(DBName);
    fun(DB);
  } else {
    client.connect((err) => {
      if (err) throw err;
      const DB = client.db(DBName);
      fun(DB);
    });
  }

}


module.exports = {
  createExperience
}