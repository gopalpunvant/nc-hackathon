const express = require('express');
const fsExtra = require('fs-extra');
const fs = require('fs');
const app = express();
const port = 3000;
const sourceFolder = './templates/project';
const destinationFolder = '../demo-app';
const { exec } = require("child_process");
const codeGenerator = require('./codeGenerator');

app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.get('/createProject', (req, res) => {
  try {
    fsExtra.copySync(sourceFolder, destinationFolder);
    exec(`cd ../demo-app && npm install`, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
    console.log("Folder copied successfully.");
  });
  setTimeout(() => {
    res.send('Project is created.');
  }, 5000);
  } catch (error) {
    console.error("Error copying folder:", error);
  }
})

app.post('/generateCode', (req, res) => {
  try {
    const appJSContent = codeGenerator(req.body);
    fs.writeFileSync(destinationFolder + '/src/App.js', appJSContent);
  } catch (error) {
    console.error("Error copying folder:", error);
  }
  res.send('Code is gernerated.');
})

app.get('/deployProject', (req, res) => {
  try {
    exec(`cd ../demo-app && npm start`, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`Moved to ${destinationFolder}`);
      res.send(`stdout: ${stdout}`)
    });
  } catch (error) {
    console.error("Error copying folder:", error);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})