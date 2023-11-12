const express = require("express");
const app = express();
const port = 3001; // You can use any port you prefer

const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: ".env" });

console.log(process.env.DEVICE_NAME);

const folderPath = path.join(
    __dirname,
    `../data_output_${process.env.DEVICE_NAME}`
);

function loadFirstJsonFile() {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return;
        }

        const jsonFiles = files.filter(
            (file) => path.extname(file) === ".json"
        );

        if (jsonFiles.length === 0) {
            console.log("No JSON files found in the folder.");
            return;
        }

        const firstJsonFile = jsonFiles[0];
        const filePath = path.join(folderPath, firstJsonFile);

        fs.readFile(filePath, "utf8", (readErr, data) => {
            if (readErr) {
                console.error("Error reading JSON file:", readErr);
                return;
            }

            const jsonData = JSON.parse(data);
            console.log("Content of the first JSON file:", jsonData);
        });
    });
}

loadFirstJsonFile();

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
