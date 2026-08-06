// pode utilizar import ou require
const fs = require('fs')//Filesystem

fs.readFile('arquivo.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return;
    } else {
        console.log(data)
    }
}

)