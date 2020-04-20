var fs = require("fs")


function view(templateName, values, res) {
    //read from the template files
    var fileContents = fs.readFileSync('./views/' + templateName + ".html");
    //insert values in to the content
    res.write(fileContents);
    console.log(fileContents)


   
}

module.exports.view = view;