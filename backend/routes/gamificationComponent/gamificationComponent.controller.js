const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helpers");

const collection = "gamificationComponent"

function createGamificationComponent(req, res) {
    const { name, description, url, studentsTeam, length, space, materials, subjectMatter, purpose, learningObjetive, studentsInstructions, instructorsInstructions } = req.body;

    if (name && description && url && studentsTeam && length && space && materials && subjectMatter && purpose && learningObjetive && studentsInstructions && instructorsInstructions) {
        let fun = (DB) =>
            DB
                .collection(collection)
                .updateOne({ name },
                    { $set: { name, description, url, studentsTeam, length, space, materials, subjectMatter, purpose, learningObjetive, studentsInstructions, instructorsInstructions } },
                    { upsert: true },
                    (err, item) => {
                        if (err) throw err;
                       
                        if (item.upsertedCount > 0) {
                            res.status(201).send({
                                status: true,
                                data: { name, description, url, studentsTeam, length, space, materials, subjectMatter, purpose, learningObjetive, studentsInstructions, instructorsInstructions },
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
    createGamificationComponent
}