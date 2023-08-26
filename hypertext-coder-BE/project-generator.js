// copy file
// const fs = require('fs');

// fs.copyFile('../README.md', './abcd.txt', (err) => {
//   if (err) throw err;
//   console.log('File was copied to destination');
// });


//copy folder
const fs = require("fs-extra");

async function copyFolder(sourceFolder, destinationFolder) {
  try {
    await fs.copySync(sourceFolder, destinationFolder);
    console.log("Folder copied successfully.");
  } catch (error) {
    console.error("Error copying folder:", error);
  }
}

// Example usage
copyFolder("../templates/project", "../demo-app");
