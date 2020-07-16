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



module.exports = {
  newFile
}