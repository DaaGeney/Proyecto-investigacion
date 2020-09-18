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
  const {name,description,subjectMatter, htmlFacilitation,htmlCore,htmlEval,infoComponentsEval,infoComponentsFaciltiation,infoComponentsCore } = req.body
  if (true) {
    pdf
      .create(
        `<!DOCTYPE html>
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;600&display=swap" rel="stylesheet">        
        <style>
        
        html {
          font-family: 'Open Sans', sans-serif;
          text-align: justify;
        }

        div.b {
          line-height: 1.6;
        }
        
        .rombo, .hexagono, .pentagono, .rectangle, .hexagonoOpc, .rectangleOpc {
          background-size:     100% 100%;                      /* <------ */
          background-repeat:   no-repeat;
          background-position: center center; 
          min-height: 50px;
          max-height: 150px;
          min-width: 90px;
          max-width: 120px;
          display: inline-block;
          text-align: center;
          font-size: 13px;
          padding-top: 30px;
          padding-bottom: 30px;
          
        }
        .hexagonoOpc {
          background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/hexagono-opc.png");
          padding-right: 20px;
          padding-left: 20px;
        }
        .rectangleOpc {
          background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/rectangulo-opc.png") ;
          padding-right: 15px;
          padding-left: 15px;
          padding-top: 17px;
          padding-bottom: 17px;
        }

        .rectangle {
          background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/rectangulo.png") ;
          padding-right: 15px;
          padding-left: 15px;
          padding-top: 17px;
          padding-bottom: 17px;
        }

        .pentagono {
          background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/pentagono.png") ;
          padding-right: 15px;
          padding-left: 15px;
        }
        
        .hexagono {
          background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/hexagono.png") ;
          padding-right: 20px;
          padding-left: 20px;
        }

        .rombo {
            background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/rombo.png") ;
            padding-right: 15px;
            padding-left: 15px;
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
        
        <h1>Gamification Experience: ${name}</h1>
        
        <h3>Subject Matter: ${subjectMatter}</h3>
        <div class="b">
        <h3 >Description: </h3>
        <p >${description}</p>
        
        </div>
        <strong>*Components without borders are mandatories</strong>
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
        
        <strong>Convention:</strong>  
       
        <br>
        <img src="https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/helper.png" alt="Error" width="400" height="150">
        <h2>Phase 1: Facilitation</h2>
        ${infoComponentsFaciltiation}
        <h2>Phase 2: Core</h2>
        ${infoComponentsCore}
        <h2>Phase 3: Evaluation</h2>
        ${infoComponentsEval}
        </body>
        </html> 
        `,
        {
          format: "Letter",
          border: {
            top: "0.4in",
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



