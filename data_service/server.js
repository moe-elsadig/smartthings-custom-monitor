const express = require("express");
const app = express();
const port = 3001; // You can use any port you prefer

const fs = require("fs").promises;

const chokidar = require("chokidar");
const path = require("path");

require("dotenv").config({ path: ".env" });
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
console.log("Device name:", Boolean(process.env.DEVICE_NAME.length));

const folderPath = path.join(
    __dirname,
    `../data_output_${process.env.DEVICE_NAME}`
);

// function loadFirstJsonFile() {
//     fs.readdir(folderPath, (err, files) => {
//         if (err) {
//             console.error("Error reading directory:", err);
//             return;
//         }

//         // console.log(files);
//         const jsonFiles = files.filter(
//             (file) => path.extname(file) === ".json"
//         );

//         if (jsonFiles.length === 0) {
//             console.log("No JSON files found in the folder.");
//             return;
//         }

//         const firstJsonFile = jsonFiles[0];
//         const filePath = path.join(folderPath, firstJsonFile);

//         fs.readFile(filePath, "utf8", (readErr, data) => {
//             if (readErr) {
//                 console.error("Error reading JSON file:", readErr);
//                 return;
//             }

//             let jsonData = JSON.parse(data);
//             console.log(jsonData);
//             return jsonData;
//         });
//     });
// }
async function loadJsonFiles(folderPath) {
    try {
        const files = await fs.readdir(folderPath);
        const jsonFiles = files.filter((file) => file.endsWith(".json"));
        const data = [];

        const promises = jsonFiles.map(async (file) => {
            const filePath = path.join(folderPath, file);
            const fileContent = await fs.readFile(filePath, "utf-8");
            if (fileContent.length) {
                return JSON.parse(fileContent);
            } else {
                return null;
            }
        });

        const jsonData = await Promise.all(promises);

        // Filter out null values (files with empty content)
        const filteredData = jsonData.filter((item) => item !== null);

        data.push(...filteredData);

        return data;
    } catch (error) {
        console.error("Error loading JSON files:", error);
        throw error;
    }
}

// Function to load and monitor JSON files in a folder
async function monitorFolderChanges(folderPath) {
    try {
        // Initial load of files in the folder
        const files = await loadJsonFiles(folderPath);
        console.log("Initial files:", files.length);

        // Watch for changes in the folder using chokidar
        const watcher = chokidar.watch(folderPath, { ignoreInitial: true });

        watcher.on("all", async (event, filePath) => {
            console.log(`File ${filePath} has been ${event}`);
            // Update the array when a change occurs
            const updatedFiles = await loadJsonFiles(folderPath);
            console.log("Updated files:", updatedFiles.length);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

let dataRecords;

loadJsonFiles(folderPath)
    .then((data) => {
        dataRecords = [...data];
        console.log("Initial loaded data:", data.length);
        // Start monitoring after the initial load
        monitorFolderChanges(folderPath);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

app.get("/", (req, res) => {
    res.json("Hello, World!");
});

app.get("/sample", (req, res) => {
    console.log("data:", dataRecords);
    console.log("returning", dataRecords[0]);
    res.send(dataRecords[0]);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
