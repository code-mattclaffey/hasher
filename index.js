const fs = require('fs');
const path = require('path');

function Hasher(options) {
  const { manifest, files, hashIdentifier } = options;

  function replaceContentsInFile(fileObject, FilesToHash) {

    return new Promise((resolve, reject) => {
      fs.readFile(path.resolve(fileObject.src, fileObject.fileName), 'utf-8', (err, data) => {
        if (err) throw err;
        resolve(data);
      });
    })
    .then(contents => {
      Object.keys(FilesToHash).forEach(fileName => {
        contents = contents.split(`${fileName}?${hashIdentifier}`).join(`${fileName}?cb=${FilesToHash[fileName]}`);
      });

      return new Promise((resolve, reject) => {

				if (!fs.existsSync(fileObject.dest)){
					fs.mkdirSync(fileObject.dest);
				}

        fs.writeFile(path.resolve(fileObject.dest, fileObject.fileName), contents, (err) => {
          if (err) throw err;
          resolve();
          console.log(`${fileObject.fileName} has been written to ${fileObject.dest}`);
        });
      })

    })
    .catch(error => {
      console.log(error);
    });
  }

  return new Promise((resolve, reject) => {
    fs.readFile(manifest, 'utf-8', (err, data) => {
      if (err) throw err;
      resolve(JSON.parse(data));
    });
  })
  .then(json => {
    return Promise.all(files.map(fileObject => replaceContentsInFile(fileObject, json)));
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports = Hasher;
