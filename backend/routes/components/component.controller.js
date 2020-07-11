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
      .update({ name },
        { $setOnInsert: { info } },
        { upsert: true },
        (err, item) => {
          if (err) throw err;
          if (item.result.upserted) {
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

function getComponent(req, res) {
  const { name } = req.params

  let fun = (DB) =>
    DB
      .collection(collection)
      .findOne({ name: { $eq: name } }, (err, items) => {
        if (err) throw err;
        res.status(200).send({
          status: true,
          data: items,
          message: "Component",
        });
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
  const { id } = req.params

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
function updateComponent(req, res) {
  const { pastName } = req.params
  const { name, info } = req.body;

  let fun = (dataBase) =>
    dataBase.collection(collection).updateOne(
      { name: { $eq: pastName }  },
      {
        $set: {
          name: name,
          info: info,
        },
      },
      (err, item) => {
        if (err) throw err;
        if (item.result.n > 0) {
          res.status(200).send({
            status: true,
            message: "Cambiado con éxito",
          });
        } else {
          res.status(404).send({
            status: false,
            message: "El usuario no se encuentra registrado",
          });
        }
      }
    );
  if (isThereAnyConnection(client)) {
    const dataBase = client.db(DBName);
    fun(dataBase);
  } else {
    client.connect((err) => {
      if (err) throw err;
      const dataBase = client.db(DBName);
      fun(dataBase);
    });
  }

}


module.exports = {
  createComponent,
  getComponents,
  deleteComponent,
  updateComponent,
  getComponent
}