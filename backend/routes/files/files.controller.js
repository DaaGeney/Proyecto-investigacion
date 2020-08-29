var fs = require('fs');
var {config} = require("../../config/index")

function newFile(req, res) {
  const { typeComponent,nameComponent } = req.params
  
  const base = `${config.folderBase}${typeComponent}/${nameComponent}`
  fs.mkdir(base, { recursive: true }, (err) => {
    if (err) throw err;
  });
  Object.values(req.files).forEach(element => {
    fs.writeFile(`${base}/${element.name}`, element.data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
  


}


const pdf = require("html-pdf");
const path = require("path");


function createPDF(req, res) {
 
  if (true) {
    pdf
      .create(
        `<!DOCTYPE html>
      <html>
        <head>
          
        </head>
        <body>
          <div>
            <div>
              <div>
                <h2 style="text-align: center; float: left; margin-left: 50px;">Informe final</h2>
              </div>
            </div>
            <h3 style="text-align: center">Resultados</h3>
          </div>
        </body>
      </html>`,
        {
          format: "Letter",
          border: {
            top: "0.5in",
            bottom: "0.5in",
          },
        }
      )
      .toFile("result.pdf", (err) => {
        if (err) throw err;
        res
          .status(201)
          .sendFile(`${path.dirname(require.main.filename)}/result.pdf`);
      });
  } else {
    res.status(404).send({
      status: false,
      data: [],
      message: "No se han ingresado todos los campos",
    });
  }
}
module.exports = {
  newFile,
  createPDF
}



