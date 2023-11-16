console.log("Running...");

require("dotenv").config({ path: ".env" });

console.log(".env detectable:", Boolean(process.env.DEVICE_ID.length));

const { exec } = require("child_process");
const fs = require("fs");

const deviceName = process.env.DEVICE_NAME; // no spaces in the name
const deviceID = process.env.DEVICE_ID;
const outputPrefix = "output_";
const outputFolder = "data_output_" + deviceName;
let fileTimestamp = "sample_";

function areJsonObjectsEqual(obj1, obj2) {
    const str1 = JSON.stringify(obj1);
    const str2 = JSON.stringify(obj2);
    return str1 === str2;
}

function deleteIdenticalJsonFiles(folderPath) {
    const fileContents = {};

    // Read files in the folder
    const files = fs.readdirSync(folderPath);

    // Iterate through files in reverse order (newest to oldest)
    for (let i = files.length - 1; i >= 0; i--) {
        const file = files[i];
        const filePath = `${folderPath}/${file}`;

        // Check if it's a file
        if (fs.statSync(filePath).isFile()) {
            // Read content of the file
            const fileContent = fs.readFileSync(filePath, "utf-8");

            // Check if the file is empty
            const isEmpty = fileContent.trim() === "";

            if (isEmpty) {
                console.log(`Deleting empty file: ${filePath}`);
                fs.unlinkSync(filePath);
            } else if (fileContents[fileContent]) {
                // If content already exists, delete the file
                console.log(`Deleting identical file (newer): ${filePath}`);
                fs.unlinkSync(filePath);
            } else {
                // Store content for future comparisons
                fileContents[fileContent] = true;
            }
        }
    }

    console.log("Deletion process completed.");
}

// Example usage
deleteIdenticalJsonFiles(outputFolder);
