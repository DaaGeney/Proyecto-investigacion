const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helpers");
var ObjectId = require('mongodb').ObjectID;

const collection = "components"

function createComponent(req, res) {
  const name = req.body.name
  const info = req.body.info

  let fun = (DB) => 
    DB
      .collection(collection)
      .updateOne({ name },
        { $set: { info } },
        { upsert: true },
        (err, item) => {
          if (err) throw err;

          if (item.upsertedCount > 0) {
            res.status(201).send({
              status: true,
              data: { info },
              message: "Metodología creada correctamente",
            });
          } else {
            res.status(404).send({
              status: false,
              data: [],
              message: "Metologia existente",
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

function getComponents(req, res) {
  let fun = (DB) =>
    DB
      .collection(collection)
      .find()
      .toArray((err, items) => {
        if (err) throw err;
        if (items.length > 0) {
          res.status(200).send({
            status: true,
            data: items,
            message: "Components",
          });
        } else {
          res.status(400).send({
            status: false,
            data: [],
            message: "without results",
          });
        }
      });
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
function deleteComponent(req, res) {
  const { id } = req.body
  console.log(req.body);
  
  let fun = (DB) =>
    DB.collection(collection).deleteOne(
      { _id: { $eq: ObjectId(id) } },
      (err, item) => {
        if (err) throw err;

        if (item.result.n > 0) {
          res.status(200).send({
            status: true,
            message: "Eliminación correcta",
          });
        } else {
          res.status(404).send({
            status: false,
            message: "Indice no existe",
          });
        }
      });
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
  createComponent,
  getComponents,
  deleteComponent
}