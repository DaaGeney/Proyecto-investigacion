const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helpers");
var ObjectId = require('mongodb').ObjectID;

const collection = "Subject"

function createSubject(req, res) {
  const {topic, subject, level, program} = req.body
  

  let fun = (DB) =>
    DB
      .collection(collection)
      .update({ topic },
        { $setOnInsert: { subject, level, program } },
        { upsert: true },
        (err, item) => {
          if (err) throw err;
          if (item.result.upserted) {
            res.status(201).send({
              status: true,
              data: { topic, subject, level, program },
              message: "Tematica creada correctamente",
            });
          } else {
            res.status(404).send({
              status: false,
              data: [],
              message: "Existente",
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
  createSubject
}