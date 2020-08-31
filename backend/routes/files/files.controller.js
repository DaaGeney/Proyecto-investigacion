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
  const {htmlFacilitation,htmlCore,htmlEval } = req.body
  let json = {holis: "holis"}
  if (true) {
    pdf
      .create(
        `<!DOCTYPE html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
        .rectangle {
        background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/rectangulo.png") ;
          background-size:     100% 100%;                      /* <------ */
          background-repeat:   no-repeat;
          background-position: center center; 
          min-height: 70px;
          max-height: 200px;
          min-width: 130px;
          max-width: 170px;
          display: inline-block;
          text-align: center;

        
        }
        .pentagono {
        background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/pentagono.png") ;
          background-size:     100% 100%;                      /* <------ */
          background-repeat:   no-repeat;
          background-position: center center; 
          min-height: 70px;
          max-height: 200px;
          min-width: 130px;
          max-width: 170px;
          display: inline-block;
          text-align: center;

        
        }
        .hexagono {
        background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/hexagono.png") ;
          background-size:     100% 100%;                      /* <------ */
          background-repeat:   no-repeat;
          background-position: center center; 
          min-height: 70px;
          max-height: 200px;
          text-align: center;
          min-width: 130px;
          max-width: 170px;
            display: inline-block;
        
        }
        .rombo {
        background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/rombo.png") ;
           background-size:     100% 100%;                      /* <------ */
          background-repeat:   no-repeat;
          background-position: center center; 
          min-height: 70px;
          max-height: 200px;
          text-align: center;

          min-width: 130px;
          max-width: 170px;
            display: inline-block;
        
        }
        
        .item1 {
          grid-area: header;
          border: 1px solid #000; 

        }
        .item2 {
          grid-area: main;
          border: 1px solid #000;

        }
        .item3 {
          grid-area: footer;
          border: 1px solid #000;

        }
        
        .grid-container {
          display: grid;
          grid-template-areas:
            "header header header header header header"
            "main main main main main main"
            "footer footer footer footer footer footer";
            grid-gap: 5px;
            background-color: #2196f3;
            padding: 1px;
            border: 1px solid #000;
        }
        
        .grid-container > div {
          background-color: rgba(255, 255, 255, 0.8);
          padding: 20px 45px;
          font-size: 20px;
        }
        </style>
        </head>
        <body>
        <div class="grid-container">
        
                <div class="item1">
                Phase 1: Facilitation
                <br>
                <br>
                  ${htmlFacilitation}
                </div>
                <div class="item2">
                Phase 2: Core
                <br>
                <br>
                  ${htmlCore}
                </div>
                <div class="item3">
                Phase 3: evaluation
                <br>
                <br>
                ${htmlEval}
                
                </div>
                
        </div>
        <br>
        <img src="https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/helper.png" alt="Error" width="400" height="150">
        <h1>Phase 1: Facilitation</h1>
        ${htmlFacilitation}
        ${json}
        </body>
        </html> 
        `,
        {
          format: "Letter",
          border: {
            top: "0.5in",
            left:"0.5in",
            right:"0.4in",
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



