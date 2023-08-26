const express = require('express');
const fsExtra = require('fs-extra');
const app = express();
const port = 3000;
const sourceFolder = './templates/project';
const destinationFolder = '../demo-app';

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.get('/createProject', (req, res) => {
    try {
      fsExtra.copySync(sourceFolder, destinationFolder);
      console.log("Folder copied successfully.");
    } catch (error) {
      console.error("Error copying folder:", error);
    }
  res.send('Project is created.')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})