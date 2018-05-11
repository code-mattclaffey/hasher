const fs = require('fs');
const path = require('path');

const Hasher = require('./index');

const options = {
  manifest: './test.json',
  files: [
		{
			fileName: 'index.html',
			src: `./`,
			dest: `./output`
		}
  ],
  hashIdentifier: 'cb=hashme'
};

const manifest = require('./test.json');

describe('hasher', () => {
	test('it should write the hash on the end of the files specified.', () => {
		Hasher(options).then(function() {

			const files = Object.keys(manifest).map(key => `${key}?cb=${manifest[key]}`);

			const expectedCount = files.length;

			let totalCount = 0;

			fs.readFile(path.resolve(options.files[0].dest, options.files[0].fileName), (err, data) => {
				files.forEach(fileName => {
					if(data.includes(fileName)) {
						totalCount++;
					}
				});

				expect(totalCount).toBe(expectedCount);
			});
		})
		.catch(error => {
			console.log(error);
		});
	});
});


