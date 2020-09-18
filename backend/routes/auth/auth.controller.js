const crypto = require("crypto");
const { DBName, client } = require("../../config/mongo.config");
const ObjectId = require("mongodb").ObjectID;
const { isThereAnyConnection } = require("../../utils/helpers");
const { createToken } = require("../../utils/auth");
const {mailDetails} = require("../../utils/sendEmail")

const collection = "users";


function createUser(req, res) {
  const { name, email, password, role } = req.body;
  if (name && email && password && role) {
    let body = {
      name,
      role,
      password: crypto.createHmac("sha256", password).digest("hex")

    };
    let fun = (dataBase) =>
      dataBase
        .collection(collection)
        .updateOne({ email }, { $set: body }, { upsert: true }, (err, item) => {
          if (err) throw err;
          if (item.upsertedCount > 0) {
            delete body.password;
            body.email = email;
            res.status(201).send({
              status: true,
              data: body,
              message: "Usuario creado con éxito",
            });
          } else {
            res.status(404).send({
              status: false,
              data: [],
              message: "Este email ya se encuentra registrado",
            });
          }
        });
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
  } else {
    res.status(400).send({
      status: false,
      data: [],
      message: "No se han ingresado todos los campos",
    });
  }
}


function logIn(req, res) {
  const { email, password } = req.body;
  if (email && password) {
    let fun = (dataBase) =>
      dataBase.collection(collection).findOne(
        {
          $and: [
            {
              email,
              password: crypto.createHmac("sha256", password).digest("hex"),
            },
          ],
        },
        (err, user) => {
          if (err) throw err;
          if (user) {
            const token = createToken({ ...user });
            delete user.password;

            delete user.name;
            res.status(200).send({
              status: true,
              data: user,
              message: "Usuario encontrado",
              token: token,
            });
          } else {
            res.status(404).send({
              status: false,
              data: [],
              message:
                "El usuario no se encuentra registrado",
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
  } else {
    res.status(400).send({
      status: false,
      data: [],
      message: "No se han ingresado todos los campos",
    });
  }
}

function getRole(req, res) {
  let { id } = req.params;
  if (id.length >= 24) {
    let fun = (dataBase) =>
      dataBase
        .collection(collection)
        .findOne({ _id: ObjectId(id) }, (err, item) => {
          if (err) throw err;
          if (item) {
            delete item.password;
            res.status(200).send({
              status: true,
              role: item.role,
              message: `Usuario encontrado`,
            });
          } else {
            res.status(404).send({
              status: false,
              data: [],
              message: `El usuario con id ${id} no se encuentra registrado`,
            });
          }
        });
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
  } else {
    res.status(400).send({
      status: false,
      data: [],
      message: "Necesitas el id del usuario",
    });
  }
}

function getUsers(req, res) {
  let fun = (DB) =>
    DB
      .collection(collection)
      .find()
      .toArray((err, items) => {
        if (err) throw err;
        items.map(e => delete e.password)
        if (items.length > 0) {
          res.status(200).send({
            status: true,
            data: items,
            message: "Users",
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

function deleteUser(req, res) {
  const { id } = req.params
  if (id.length >= 24) {
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

}
function updateUser(req, res) {
  const { pastEmail } = req.params
  const { name, email, role } = req.body;

  let fun = (dataBase) =>
    dataBase.collection(collection).updateOne(
      { email: { $eq: pastEmail } },
      {
        $set: {
          name: name,
          email: email,
          role: role
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

function restorePassword(req, res) {
  let { email } = req.body;
  if (email) {
    let fun = (dataBase) =>
      dataBase.collection(collection).findOne({ email }, (err, item) => {
        if (err) throw err;
        if (item) {
          let token = createToken({ ...item });
          mailDetails(email, token);
          res.status(200).send({
            status: true,
            data: { email, token },
            message: "El link fue enviado al correo ingresado.",
          });
        } else {
          res.status(404).send({
            status: false,
            data: [],
            message: `El usuario con correo ${email} no se encontró`,
          });
        }
      });
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
  } else {
    res.status(400).send({
      status: false,
      data: [],
      message: "Necesitas el id del usuario",
    });
  }
}

function changePassword(req, res) {
  let { email, newPassword } = req.body;
  if (email && newPassword) {
    let fun = (dataBase) =>
      dataBase.collection(collection).updateOne(
        { email },
        {
          $set: {
            password: crypto.createHmac("sha256", newPassword).digest("hex"),
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
  } else {
    res.status(400).send({
      status: false,
      data: [],
      message: "Necesitas el id del usuario",
    });
  }
}

module.exports = {
  logIn,
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getRole,
  restorePassword,
  changePassword
};