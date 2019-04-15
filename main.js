const fs = require('fs');

let jsonPath  = getNearestJson();
if(!jsonPath) {
    console.error("no package.json found!");
} else {

    let runDir    = jsonPath;
    const pkgjson = require(`${jsonPath}\\package.json`);
    let scripts   = pkgjson.scripts;

    showOptions(scripts);
}


//

function getNearestJson() {
    const editor = atom.workspace.getActivePaneItem();
    const file   = editor.buffer.file;
    const path   = file.path;

    const searchingPath = path.split('\\');
    return searchWithin(searchingPath);
}

function searchWithin(location) {

    if(!location.length) {
        return false;
    }

    location.pop();

    try {
        if(fs.existsSync(location.join('\\') + '\\package.json')) {
            console.log(location.join('\\'))
            return location.join('\\');
        } else {
            return searchWithin(location);
        }
    } catch(err) {
        console.error(err)
    }
}

function showOptions(scripts){
    const elmsArray = document.createElement('div');

    Object.entries(scripts).forEach(script => {

        const newElm  = document.createElement('div');
        const header  = document.createElement('h4');
        const content = document.createElement('div');

        header.innerHTML  = script[0];
        content.innerHTML = script[1];

        newElm.appendChild(header);
        newElm.appendChild(content);

        elmsArray.appendChild(newElm);
    });


    atom.workspace.addModalPanel({item: elmsArray});
}











//
