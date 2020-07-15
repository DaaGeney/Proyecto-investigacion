const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helpers");
var ObjectId = require('mongodb').ObjectID;

const collection = "Experience"

function createExperience(req, res) {
  const { data } = req.body


  let fun = (DB) =>
    DB
      .collection(collection)
      .insert({ data },
        (err, item) => {
          if (err) throw err;
          console.log(req.body)
          res.status(201).send({
            status: true,
            data: { data },
            message: "Experiencia creada correctamente",
          });
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