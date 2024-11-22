// moveSourceMap.js
const fs = require('fs');
const path = require('path');

const sourceMapPath = path.join(__dirname, 'public/js/bundle.js.map');
const destinationPath = path.join(__dirname, 'public/bundle.js.map');

fs.rename(sourceMapPath, destinationPath, (err) => {
  if (err) {
    console.error('Error moving source map:', err);
  } else {
    console.log('Source map moved successfully');
  }
});
