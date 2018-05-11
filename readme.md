# Hasher

> Cache-busting files using query string file hash

## Setup

First we need a json file that has the file names that we need and the MD5 has assigned to it. I have built this to work with [gulp-hashsum](https://www.npmjs.com/package/gulp-hashsum). This tool outputs a json file like so:


```json
{
  "/styles/main.css": "75eb605d3881436deb4112a97a123927",
  "/scripts/main.js": "560fb7c9af85b931fc9384bd98649700"
}

```

The next thing to do is to set your css file and javascript file to have the hash identifier that we will use later in our JS plugin.

```html
<link rel="stylesheet" href="/styles/main.css?cb=hashme"/>
<script src="/scripts/main.js?cb=hashme">
```

Finally we just need out JavaScript to run our Hasher module.

```js

const Hasher = require('./index.js');

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

Hasher(options).then(() => {
  // Hasher Completed
});

```
