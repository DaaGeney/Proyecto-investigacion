var fs = require('fs');
var { config } = require("../../config/index")
const archiver = require('archiver');
function newFile(req, res) {
  const { typeComponent, nameComponent } = req.params

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

function getFile(req, res) {
  const { typeComponent, nameComponent } = req.params
  const base = `${config.folderBase}${typeComponent}`
  fs.mkdir(`${base}/backups`, { recursive: true }, (err) => {
    if (err) throw err;
  });
  createZip(base,nameComponent)
  console.log(__dirname);
  res.download(`${base}/backups/${nameComponent}.zip`)

}
function createZip(base,name) {
  // create a file to stream archive data to.
  const output = fs.createWriteStream(`${base}/backups/${name}.zip`);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on('end', function () {
    console.log('Data has been drained');
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on('error', function (err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);
  archive.directory(`${base}/${name}`, '/');
  archive.finalize();
}


const pdf = require("html-pdf");
const path = require("path");


function createPDF(req, res) {
  const { name, description, subjectMatter, htmlFacilitation, htmlCore, htmlEval, infoComponentsEval, infoComponentsFaciltiation, infoComponentsCore } = req.body
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
          font-size: 12px;
        }

        div.b {
          line-height: 1.6;
        }
        
        .rombo, .hexagono, .pentagono, .rectangle, .hexagonoOpc, .rectangleOpc {
          background-size:     100% 100%;                      /* <------ */
          background-repeat:   no-repeat;
          background-position: center center; 
          min-height: 50px;
          max-height: 100px;
          min-width: 70px;
          max-width: 100px;
          display: inline-block;
          text-align: center;
          font-size: 11px;
          padding-top: 20px;
          padding-bottom: 20px;
          
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
          padding-right: 15px;
          padding-left: 15px;
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
          font-size: 14px;
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
        <img src="https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/helper.png" alt="Error" width="370" height="120">
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
            left: "0.5in",
            right: "0.4in",
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
  createPDF,
  getFile
}



