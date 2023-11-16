const fs = require("fs");

require("dotenv").config({ path: ".env" });

console.log(".env detectable:", Boolean(process.env.DEVICE_ID.length));

const deviceName = process.env.DEVICE_NAME; // no spaces in the name
const outputFolder = "data_output_" + deviceName;

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

// Example usage with retry mechanism
function deleteFilesWithRetry(folderPath, retryCount = 3, retryDelay = 5000) {
    let attempts = 0;

    function attemptDeletion() {
        try {
            deleteIdenticalJsonFiles(folderPath);
        } catch (error) {
            if (error.code === "EBUSY" && attempts < retryCount) {
                attempts++;
                console.warn(
                    `File deletion failed, retrying in ${
                        retryDelay / 1000
                    } seconds...`
                );
                setTimeout(attemptDeletion, retryDelay);
            } else {
                console.error(`Error: ${error.message}`);
            }
        }
    }

    attemptDeletion();
}

// Example usage
deleteFilesWithRetry(outputFolder);
