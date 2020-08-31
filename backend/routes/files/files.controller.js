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
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
        .rectangle {
          min-height: 50px;
          max-height: 200px;
          height: auto;
          min-width: 100px;
          max-width: 140px;
          width: auto;
          background-color: #68C9BF;
          border-color: #000;
          border-style: solid;
        }
        .item1 {
          grid-area: header;
        }
        .item2 {
          grid-area: main;
        }
        .item3 {
          grid-area: footer;
        }
        
        .grid-container {
          display: grid;
          grid-template-areas:
            "header header header header header header"
            "main main main main main main"
            "footer footer footer footer footer footer";
          grid-gap: 1px;
          background-color: #2196f3;
          padding: 1px;
        }
        
        .grid-container > div {
          background-color: rgba(255, 255, 255, 0.8);
          text-align: center;
          padding: 20px 45px;
          font-size: 20px;
        }
        </style>
        </head>
        <body>
        <div class="grid-container">
                <div class="item1">
        <div class="rectangle">holis lol lol sds sdsds dsdsd fdfdf dfdfd</div>
                </div>
                <div class="item2">Main</div>
                <div class="item3">Footer</div>
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



