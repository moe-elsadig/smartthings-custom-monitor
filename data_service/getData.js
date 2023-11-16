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
let fileCreationInProgress = false;

exec(`mkdir ${outputFolder}`, (error, stdout, stderr) => {
    console.log(`Output folder ${outputFolder}`);
});

function myFunction() {
    if (fileCreationInProgress) {
        // console.log("File creation in progress. Skipping this interval.");
        return;
    }

    fileCreationInProgress = true;

    fileTimestamp = new Date()
        .toISOString()
        .replace(/:/g, "-")
        .replace(/\.\d+Z/, "Z");

    let filePath = `./${outputFolder}/${outputPrefix}${fileTimestamp}.json`;
    let cliCommand = `smartthings devices:status ${deviceID} -j > ./${outputFolder}/${outputPrefix}${fileTimestamp}.json`;

    exec(cliCommand, (error, stdout, stderr) => {
        fileCreationInProgress = false;

        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Command execution failed: ${stderr}`);
            return;
        }

        // Check file size
        const stats = fs.statSync(filePath);
        const fileSizeInBytes = stats.size;

        if (fileSizeInBytes === 0) {
            console.warn(`Warning: Empty file detected - ${filePath}`);

            // Remove the empty file
            fs.unlink(filePath, (unlinkError) => {
                if (unlinkError) {
                    console.error(
                        `Error removing empty file: ${unlinkError.message}`
                    );
                } else {
                    console.log(`Empty file removed: ${filePath}`);
                }
            });
        } else {
            console.log(`New file: ${fileTimestamp} ${stdout}`);
        }
    });
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

// Example usage with retry mechanism
function deleteFilesWithRetry(retryCount = 3, retryDelay = 5000) {
    let attempts = 0;

    function attemptDeletion() {
        try {
            deleteIdenticalJsonFiles(outputFolder);
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

// pre-run
deleteFilesWithRetry(outputFolder);

// Set the interval to 1 second (1,000 milliseconds) for file creation
const interval = 1000;
setInterval(myFunction, interval);

// Set the interval for cleanup to 60 mins (3,600,000 milliseconds)
const cleanupInterval = 3600000; // 60 minutes
setInterval(() => deleteFilesWithRetry(outputFolder), cleanupInterval);
