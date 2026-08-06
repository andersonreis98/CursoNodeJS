const path = require('path');
const fs = require('fs');

if (!fs.existsSync('./pasta')) {
	console.log('pasta não existe');
	fs.mkdirSync('pasta');
} else if (fs.existsSync('./pasta')) {
	console.log('Existe');
}
