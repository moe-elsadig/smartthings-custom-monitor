console.log("Running...");

require("dotenv").config({ path: ".env" });

console.log(".env detectable:", Boolean(process.env.DEVICE_ID.length));

const { exec } = require("child_process");

const deviceName = "OfficeSamsungAC"; // no spaces in the name
const deviceID = process.env.DEVICE_ID;
const outputPrefix = "output_";
const outputFolder = "data_output_" + deviceName;
let fileTimestamp = "sample_";

// "smartthings devices:status a2df25e2-7fee-7ca9-70f0-2ba4f3bc7fbb -j > sample_output2.json";

exec(`mkdir ${outputFolder}`, (error, stdout, stderr) => {
    // if (error) {
    //     console.error(`Error: ${error.message}`);
    //     return;
    // }
    // if (stderr) {
    //     console.error(`Command execution failed: ${stderr}`);
    //     return;
    // }
    // console.log(`${stdout}`);
    console.log(`Output folder ${outputFolder}`);
});

function myFunction() {
    fileTimestamp = new Date()
        .toISOString()
        .replace(/:/g, "-")
        .replace(/\.\d+Z/, "Z");

    let cliCommand = `smartthings devices:status ${deviceID} -j > ./${outputFolder}/${outputPrefix}${fileTimestamp}.json`;

    exec(cliCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Command execution failed: ${stderr}`);
            return;
        }
        console.log(`New file: ${fileTimestamp} ${stdout}`);
    });
}

// Set the interval to 15 seconds (15,000 milliseconds)
const interval = 5000;

setInterval(myFunction, interval);
