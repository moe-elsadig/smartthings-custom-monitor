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
// console.log("Device name:", Boolean(process.env.DEVICE_NAME.length));

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
    // console.log("data:", dataRecord.length);
    // console.log("returning", dataRecords[0]);
    res.send({
        components: {
            main: {
                "samsungce.silentAction": {},
                relativeHumidityMeasurement: {
                    humidity: {
                        value: 44,
                        unit: "%",
                        timestamp: "2023-11-12T11:14:00.888Z",
                    },
                },
                "custom.airConditionerOdorController": {
                    airConditionerOdorControllerProgress: {
                        value: null,
                    },
                    airConditionerOdorControllerState: {
                        value: null,
                    },
                },
                "custom.thermostatSetpointControl": {
                    minimumSetpoint: {
                        value: 16,
                        unit: "C",
                        timestamp: "2023-11-08T09:32:04.914Z",
                    },
                    maximumSetpoint: {
                        value: 30,
                        unit: "C",
                        timestamp: "2023-11-08T09:32:04.914Z",
                    },
                },
                airConditionerMode: {
                    supportedAcModes: {
                        value: ["auto", "cool", "dry", "wind", "heat"],
                        timestamp: "2023-11-08T09:32:05.129Z",
                    },
                    airConditionerMode: {
                        value: "cool",
                        timestamp: "2023-11-08T09:32:05.129Z",
                    },
                },
                "custom.spiMode": {
                    spiMode: {
                        value: null,
                    },
                },
                "samsungce.deviceIdentification": {
                    micomAssayCode: {
                        value: null,
                    },
                    modelName: {
                        value: null,
                    },
                    serialNumber: {
                        value: null,
                    },
                    serialNumberExtra: {
                        value: null,
                    },
                    modelClassificationCode: {
                        value: null,
                    },
                    description: {
                        value: null,
                    },
                    binaryId: {
                        value: "TP2X_RAC_20K",
                        timestamp: "2023-11-12T11:14:00.940Z",
                    },
                },
                airQualitySensor: {
                    airQuality: {
                        value: null,
                    },
                },
                "custom.airConditionerOptionalMode": {
                    supportedAcOptionalMode: {
                        value: [
                            "off",
                            "sleep",
                            "quiet",
                            "smart",
                            "speed",
                            "motionIndirect",
                            "motionDirect",
                            "windFree",
                            "windFreeSleep",
                        ],
                        timestamp: "2023-11-08T09:32:05.693Z",
                    },
                    acOptionalMode: {
                        value: "off",
                        timestamp: "2023-11-08T09:32:05.693Z",
                    },
                },
                "samsungce.airConditionerBeep": {
                    beep: {
                        value: "on",
                        timestamp: "2023-11-08T09:32:05.129Z",
                    },
                },
                switch: {
                    switch: {
                        value: "off",
                        timestamp: "2023-11-12T11:14:42.764Z",
                    },
                },
                "custom.airConditionerTropicalNightMode": {
                    acTropicalNightModeLevel: {
                        value: 0,
                        timestamp: "2023-11-08T09:32:05.129Z",
                    },
                },
                ocf: {
                    st: {
                        value: null,
                    },
                    mndt: {
                        value: null,
                    },
                    mnfv: {
                        value: "TP2X_RAC_20K_11230531",
                        timestamp: "2023-11-08T09:32:05.568Z",
                    },
                    mnhw: {
                        value: "MediaTek",
                        timestamp: "2023-11-08T09:32:05.568Z",
                    },
                    di: {
                        value: "a2df25e2-7fee-7ca9-70f0-2ba4f3bc7fbb",
                        timestamp: "2023-11-08T09:32:05.607Z",
                    },
                    mnsl: {
                        value: "http://www.samsung.com",
                        timestamp: "2023-11-08T09:32:05.568Z",
                    },
                    dmv: {
                        value: "res.1.1.0,sh.1.1.0",
                        timestamp: "2023-11-08T09:32:05.607Z",
                    },
                    n: {
                        value: "Samsung-Room-Air-Conditioner",
                        timestamp: "2023-11-08T09:32:05.607Z",
                    },
                    mnmo: {
                        value: "TP2X_RAC_20K|10229641|60010532001511010600001200800000",
                        timestamp: "2023-11-08T09:32:05.568Z",
                    },
                    vid: {
                        value: "DA-AC-RAC-01001",
                        timestamp: "2023-11-08T09:32:05.568Z",
                    },
                    mnmn: {
                        value: "Samsung Electronics",
                        timestamp: "2023-11-08T09:32:05.568Z",
                    },
                    mnml: {
                        value: "http://www.samsung.com",
                        timestamp: "2023-11-08T09:32:05.568Z",
                    },
                    mnpv: {
                        value: "DAWIT 2.0",
                        timestamp: "2023-11-08T09:32:05.568Z",
                    },
                    mnos: {
                        value: "TizenRT 2.0 + IPv6",
                        timestamp: "2023-11-08T09:32:05.568Z",
                    },
                    pi: {
                        value: "a2df25e2-7fee-7ca9-70f0-2ba4f3bc7fbb",
                        timestamp: "2023-11-08T09:32:05.568Z",
                    },
                    icv: {
                        value: "core.1.1.0",
                        timestamp: "2023-11-08T09:32:05.607Z",
                    },
                },
                airConditionerFanMode: {
                    fanMode: {
                        value: "turbo",
                        timestamp: "2023-11-08T09:32:05.231Z",
                    },
                    supportedAcFanModes: {
                        value: ["auto", "low", "medium", "high", "turbo"],
                        timestamp: "2023-11-08T09:32:05.231Z",
                    },
                },
                "samsungce.dustFilterAlarm": {
                    alarmThreshold: {
                        value: 500,
                        unit: "Hour",
                        timestamp: "2023-11-08T09:32:05.213Z",
                    },
                    supportedAlarmThresholds: {
                        value: [180, 300, 500, 700],
                        unit: "Hour",
                        timestamp: "2023-11-08T09:32:05.213Z",
                    },
                },
                "custom.electricHepaFilter": {
                    electricHepaFilterCapacity: {
                        value: null,
                    },
                    electricHepaFilterUsageStep: {
                        value: null,
                    },
                    electricHepaFilterLastResetDate: {
                        value: null,
                    },
                    electricHepaFilterStatus: {
                        value: null,
                    },
                    electricHepaFilterUsage: {
                        value: null,
                    },
                    electricHepaFilterResetType: {
                        value: null,
                    },
                },
                "custom.disabledCapabilities": {
                    disabledCapabilities: {
                        value: [
                            "custom.deodorFilter",
                            "custom.electricHepaFilter",
                            "custom.periodicSensing",
                            "custom.doNotDisturbMode",
                            "sec.wifiConfiguration",
                            "samsungce.airConditionerBeep",
                            "samsungce.airConditionerLighting",
                            "custom.airConditionerOdorController",
                            "samsungce.individualControlLock",
                            "samsungce.alwaysOnSensing",
                            "airQualitySensor",
                            "dustSensor",
                            "odorSensor",
                            "veryFineDustSensor",
                            "custom.spiMode",
                            "audioNotification",
                            "demandResponseLoadControl",
                        ],
                        timestamp: "2023-11-08T09:32:05.693Z",
                    },
                },
                "samsungce.airConditionerLighting": {
                    supportedLightingLevels: {
                        value: ["on", "off"],
                        timestamp: "2023-11-08T09:32:05.129Z",
                    },
                    lighting: {
                        value: "on",
                        timestamp: "2023-11-08T09:32:05.129Z",
                    },
                },
                "samsungce.driverVersion": {
                    versionNumber: {
                        value: 23040101,
                        timestamp: "2023-11-08T09:32:03.637Z",
                    },
                },
                "sec.diagnosticsInformation": {
                    logType: {
                        value: ["errCode", "dump"],
                        timestamp: "2023-11-08T09:32:05.350Z",
                    },
                    endpoint: {
                        value: "SSM",
                        timestamp: "2023-11-08T09:32:05.350Z",
                    },
                    minVersion: {
                        value: "1.0",
                        timestamp: "2023-11-08T09:32:05.350Z",
                    },
                    signinPermission: {
                        value: null,
                    },
                    setupId: {
                        value: "010",
                        timestamp: "2023-11-08T09:32:05.350Z",
                    },
                    protocolType: {
                        value: "wifi_https",
                        timestamp: "2023-11-08T09:32:05.350Z",
                    },
                    tsId: {
                        value: null,
                    },
                    mnId: {
                        value: "0AJT",
                        timestamp: "2023-11-08T09:32:05.350Z",
                    },
                    dumpType: {
                        value: "file",
                        timestamp: "2023-11-08T09:32:05.350Z",
                    },
                },
                fanOscillationMode: {
                    supportedFanOscillationModes: {
                        value: ["fixed", "all", "vertical", "horizontal"],
                        timestamp: "2023-11-08T09:32:05.193Z",
                    },
                    fanOscillationMode: {
                        value: "fixed",
                        timestamp: "2023-11-08T09:32:05.193Z",
                    },
                },
                temperatureMeasurement: {
                    temperature: {
                        value: 23,
                        unit: "C",
                        timestamp: "2023-11-08T11:10:13.749Z",
                    },
                },
                dustSensor: {
                    dustLevel: {
                        value: null,
                    },
                    fineDustLevel: {
                        value: null,
                    },
                },
                "custom.deviceReportStateConfiguration": {
                    reportStateRealtimePeriod: {
                        value: "disabled",
                        timestamp: "2023-11-08T09:32:05.680Z",
                    },
                    reportStateRealtime: {
                        value: {
                            state: "disabled",
                        },
                        timestamp: "2023-11-12T11:14:01.034Z",
                    },
                    reportStatePeriod: {
                        value: "enabled",
                        timestamp: "2023-11-08T09:32:05.680Z",
                    },
                },
                "custom.periodicSensing": {
                    automaticExecutionSetting: {
                        value: null,
                    },
                    automaticExecutionMode: {
                        value: null,
                    },
                    supportedAutomaticExecutionSetting: {
                        value: null,
                    },
                    supportedAutomaticExecutionMode: {
                        value: null,
                    },
                    periodicSensing: {
                        value: null,
                    },
                    periodicSensingInterval: {
                        value: null,
                    },
                    lastSensingTime: {
                        value: null,
                    },
                    lastSensingLevel: {
                        value: null,
                    },
                    periodicSensingStatus: {
                        value: null,
                    },
                },
                thermostatCoolingSetpoint: {
                    coolingSetpoint: {
                        value: 23,
                        unit: "C",
                        timestamp: "2023-11-08T11:07:03.544Z",
                    },
                },
                demandResponseLoadControl: {
                    drlcStatus: {
                        value: {
                            drlcType: 1,
                            drlcLevel: -1,
                            start: "1970-01-01T00:00:00Z",
                            duration: 0,
                            override: false,
                        },
                        timestamp: "2023-11-08T09:32:05.693Z",
                    },
                },
                audioVolume: {
                    volume: {
                        value: 100,
                        unit: "%",
                        timestamp: "2023-11-08T09:32:05.129Z",
                    },
                },
                powerConsumptionReport: {
                    powerConsumption: {
                        value: {
                            energy: 4867,
                            deltaEnergy: 0,
                            power: 0,
                            powerEnergy: 25882.49421332856,
                            persistedEnergy: 4867,
                            energySaved: 0,
                            start: "2023-11-08T12:26:15Z",
                            end: "2023-11-12T11:14:42Z",
                        },
                        timestamp: "2023-11-12T11:14:42.620Z",
                    },
                },
                "custom.autoCleaningMode": {
                    autoCleaningMode: {
                        value: "off",
                        timestamp: "2023-11-08T09:32:05.336Z",
                    },
                },
                "samsungce.individualControlLock": {
                    lockState: {
                        value: null,
                    },
                },
                "samsungce.alwaysOnSensing": {
                    origins: {
                        value: [],
                        timestamp: "2023-11-08T09:32:05.693Z",
                    },
                    alwaysOn: {
                        value: "off",
                        timestamp: "2023-11-08T09:32:05.693Z",
                    },
                },
                refresh: {},
                audioNotification: {},
                execute: {
                    data: {
                        value: {
                            payload: {
                                rt: ["x.com.samsung.da.filter.airdust"],
                                if: ["oic.if.baseline", "oic.if.a"],
                                "x.com.samsung.da.filterUsage": "3",
                                "x.com.samsung.da.filterUsageResolution": "1",
                                "x.com.samsung.da.filterDesiredUsage": "500",
                                "x.com.samsung.da.filterStatus": "normal",
                                "x.com.samsung.da.filterCapacity": "500",
                                "x.com.samsung.da.filterCapacityUnit": "Hour",
                                "x.com.samsung.da.filterResetType": [
                                    "replaceable",
                                    "washable",
                                ],
                            },
                        },
                        data: {
                            href: "/filter/airdustfilter/vs/0",
                        },
                        timestamp: "2023-11-08T09:34:35.107Z",
                    },
                },
                "sec.wifiConfiguration": {
                    autoReconnection: {
                        value: null,
                    },
                    minVersion: {
                        value: null,
                    },
                    supportedWiFiFreq: {
                        value: null,
                    },
                    supportedAuthType: {
                        value: null,
                    },
                    protocolType: {
                        value: null,
                    },
                },
                "samsungce.selfCheck": {
                    result: {
                        value: null,
                    },
                    supportedActions: {
                        value: ["start", "cancel"],
                        timestamp: "2023-11-08T09:32:05.129Z",
                    },
                    progress: {
                        value: 1,
                        unit: "%",
                        timestamp: "2023-11-08T09:32:05.129Z",
                    },
                    errors: {
                        value: [],
                        timestamp: "2023-11-08T09:32:05.085Z",
                    },
                    status: {
                        value: "ready",
                        timestamp: "2023-11-08T09:32:05.129Z",
                    },
                },
                "custom.dustFilter": {
                    dustFilterUsageStep: {
                        value: 1,
                        timestamp: "2023-11-08T09:32:05.213Z",
                    },
                    dustFilterUsage: {
                        value: 3,
                        timestamp: "2023-11-08T09:32:05.213Z",
                    },
                    dustFilterLastResetDate: {
                        value: null,
                    },
                    dustFilterStatus: {
                        value: "normal",
                        timestamp: "2023-11-08T09:32:05.213Z",
                    },
                    dustFilterCapacity: {
                        value: 500,
                        unit: "Hour",
                        timestamp: "2023-11-08T09:32:05.213Z",
                    },
                    dustFilterResetType: {
                        value: ["replaceable", "washable"],
                        timestamp: "2023-11-08T09:32:05.213Z",
                    },
                },
                odorSensor: {
                    odorLevel: {
                        value: null,
                    },
                },
                "custom.deodorFilter": {
                    deodorFilterLastResetDate: {
                        value: null,
                    },
                    deodorFilterCapacity: {
                        value: null,
                    },
                    deodorFilterStatus: {
                        value: null,
                    },
                    deodorFilterResetType: {
                        value: null,
                    },
                    deodorFilterUsage: {
                        value: null,
                    },
                    deodorFilterUsageStep: {
                        value: null,
                    },
                },
                "custom.energyType": {
                    energySavingSupport: {
                        value: false,
                        timestamp: "2023-11-08T09:32:05.106Z",
                    },
                    drMaxDuration: {
                        value: 1440,
                        unit: "min",
                        timestamp: "2023-11-08T09:32:05.334Z",
                    },
                    energyType: {
                        value: "1.0",
                        timestamp: "2023-11-08T09:32:05.693Z",
                    },
                    energySavingLevel: {
                        value: null,
                    },
                    supportedEnergySavingLevels: {
                        value: null,
                    },
                    energySavingOperation: {
                        value: null,
                    },
                    energySavingOperationSupport: {
                        value: false,
                        timestamp: "2023-11-08T09:32:05.334Z",
                    },
                },
                "samsungce.airQualityHealthConcern": {
                    supportedAirQualityHealthConcerns: {
                        value: null,
                    },
                    airQualityHealthConcern: {
                        value: null,
                    },
                },
                "samsungce.softwareUpdate": {
                    targetModule: {
                        value: {},
                        timestamp: "2023-11-08T09:32:05.645Z",
                    },
                    otnDUID: {
                        value: "ZPCGCEMP3HBUW",
                        timestamp: "2023-11-08T09:32:05.350Z",
                    },
                    lastUpdatedDate: {
                        value: null,
                    },
                    availableModules: {
                        value: [],
                        timestamp: "2023-11-08T09:32:05.350Z",
                    },
                    newVersionAvailable: {
                        value: false,
                        timestamp: "2023-11-08T09:32:05.350Z",
                    },
                    operatingState: {
                        value: null,
                    },
                    progress: {
                        value: null,
                    },
                },
                veryFineDustSensor: {
                    veryFineDustLevel: {
                        value: null,
                    },
                },
                "custom.veryFineDustFilter": {
                    veryFineDustFilterStatus: {
                        value: null,
                    },
                    veryFineDustFilterResetType: {
                        value: null,
                    },
                    veryFineDustFilterUsage: {
                        value: null,
                    },
                    veryFineDustFilterLastResetDate: {
                        value: null,
                    },
                    veryFineDustFilterUsageStep: {
                        value: null,
                    },
                    veryFineDustFilterCapacity: {
                        value: null,
                    },
                },
                "custom.doNotDisturbMode": {
                    doNotDisturb: {
                        value: null,
                    },
                    startTime: {
                        value: null,
                    },
                    endTime: {
                        value: null,
                    },
                },
            },
        },
    });
});

app.get("/data", (req, res) => {
    // console.log("data:", dataRecord.length);
    // console.log("returning", dataRecords[0]);
    res.json({ dataRecords });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
