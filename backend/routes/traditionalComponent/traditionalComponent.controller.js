const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helpers");

const collection = "traditionalComponent"

function createTraditionalComponent(req, res) {
    const { name, description, url, attachments } = req.body;

    if (name && description && url && attachments) {
        let fun = (DB) =>
            DB
                .collection(collection)
                .updateOne({ name },
                    { $set: { name, description, url, attachments } },
                    { upsert: true },
                    (err, item) => {
                        if (err) throw err;
                       
                        if (item.upsertedCount > 0) {
                            res.status(201).send({
                                status: true,
                                data: { name, description, url, attachments },
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
    } else {
        res.status(400).send({
            status: false,
            data: [],
            message: "Verifique sus campos",
        });
    }
}

module.exports = {
    createTraditionalComponent
}