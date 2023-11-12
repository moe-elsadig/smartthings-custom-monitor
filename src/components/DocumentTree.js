import React, { useState } from "react";
import {
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from "@mui/material";
import { AddCircleTwoTone, ExpandLess, ExpandMore } from "@mui/icons-material";
import ExportTable from "./ExportTable";

const DocumentTree = ({ data }) => {
    const [selectedPaths, setSelectedPaths] = useState([
        "components.main.relativeHumidityMeasurement.humidity.value",
        "components.main.relativeHumidityMeasurement.humidity.unit",
        "components.main.custom.thermostatSetpointControl.minimumSetpoint.value",
        "components.main.custom.thermostatSetpointControl.minimumSetpoint.unit",
        "components.main.custom.thermostatSetpointControl.maximumSetpoint.value",
        "components.main.custom.thermostatSetpointControl.maximumSetpoint.unit",
        "components.main.airConditionerMode.airConditionerMode.value",
        "components.main.custom.airConditionerOptionalMode.acOptionalMode.value",
        "components.main.switch.switch.value",
        "components.main.custom.airConditionerTropicalNightMode.acTropicalNightModeLevel.value",
        "components.main.airConditionerFanMode.fanMode.value",
        "components.main.samsungce.dustFilterAlarm.alarmThreshold.value",
        "components.main.samsungce.dustFilterAlarm.alarmThreshold.unit",
        "components.main.fanOscillationMode.fanOscillationMode.value",
        "components.main.temperatureMeasurement.temperature.value",
        "components.main.temperatureMeasurement.temperature.unit",
        "components.main.thermostatCoolingSetpoint.coolingSetpoint.value",
        "components.main.thermostatCoolingSetpoint.coolingSetpoint.unit",
        "components.main.audioVolume.volume.value",
        "components.main.audioVolume.volume.unit",
        "components.main.powerConsumptionReport.powerConsumption.value.energy",
        "components.main.powerConsumptionReport.powerConsumption.value.deltaEnergy",
        "components.main.powerConsumptionReport.powerConsumption.value.power",
        "components.main.powerConsumptionReport.powerConsumption.value.powerEnergy",
        "components.main.powerConsumptionReport.powerConsumption.value.persistedEnergy",
        "components.main.powerConsumptionReport.powerConsumption.value.energySaved",
        "components.main.powerConsumptionReport.powerConsumption.value.start",
        "components.main.powerConsumptionReport.powerConsumption.value.end",
        "components.main.execute.data.value.payload.x.com.samsung.da.filterUsage",
        "components.main.execute.data.value.payload.x.com.samsung.da.filterUsageResolution",
        "components.main.execute.data.value.payload.x.com.samsung.da.filterStatus",
        "components.main.execute.data.value.payload.x.com.samsung.da.filterCapacity",
        "components.main.execute.data.value.payload.x.com.samsung.da.filterCapacityUnit",
        "components.main.samsungce.selfCheck.status.value",
        "components.main.custom.energyType.energySavingSupport.value",
        "components.main.custom.energyType.drMaxDuration.value",
        "components.main.custom.energyType.drMaxDuration.unit",
    ]);

    const handleAddToSelected = (path) => {
        setSelectedPaths((prevPaths) => [
            ...prevPaths,
            path.replace("components.components.", "components."),
        ]);
    };

    const renderTreeNode = (node, path) => {
        if (node && typeof node === "object") {
            const keys = Object.keys(node);

            if (keys.length === 0) {
                return (
                    <ListItem
                        key={path}
                        style={{ backgroundColor: "yellowgreen" }}
                    >
                        <ListItemText
                            primary={`${path
                                .split(".")
                                .pop()}: ${JSON.stringify(node)}`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                onClick={() => handleAddToSelected(path)}
                            >
                                <AddCircleTwoTone />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            }

            return (
                <React.Fragment key={path}>
                    <ListItem button onClick={() => handleToggle(path)}>
                        <ListItemText primary={path} />
                        {openStates[path] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                        in={openStates[path]}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {keys.map((key) => {
                                const newPath = `${path}.${key}`;
                                return renderTreeNode(node[key], newPath);
                            })}
                        </List>
                    </Collapse>
                </React.Fragment>
            );
        }

        return (
            <ListItem key={path} style={{ backgroundColor: "yellowgreen" }}>
                <ListItemText
                    primary={`${path.split(".").pop()}: ${JSON.stringify(
                        node
                    )}`}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        onClick={() => handleAddToSelected(path)}
                    >
                        <AddCircleTwoTone />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    };

    const [openStates, setOpenStates] = React.useState({});

    const handleToggle = (path) => {
        setOpenStates((prevOpenStates) => ({
            ...prevOpenStates,
            [path]: !prevOpenStates[path],
        }));
    };

    return (
        <div>
            <List
                sx={{
                    width: "100%",
                    maxWidth: "auto",
                    bgcolor: "background.paper",
                }}
                component="nav"
            >
                {renderTreeNode(data, "components")}
            </List>

            <div>
                <Typography variant="h6">Selected Paths:</Typography>
                <List>
                    {selectedPaths.map((path) => (
                        <ListItem key={path}>
                            <ListItemText primary={path} />
                        </ListItem>
                    ))}
                </List>
            </div>

            <ExportTable
                columns={selectedPaths}
                data={[
                    {
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
                                        value: [
                                            "auto",
                                            "cool",
                                            "dry",
                                            "wind",
                                            "heat",
                                        ],
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
                                        value: [
                                            "auto",
                                            "low",
                                            "medium",
                                            "high",
                                            "turbo",
                                        ],
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
                                        value: [
                                            "fixed",
                                            "all",
                                            "vertical",
                                            "horizontal",
                                        ],
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
                                                rt: [
                                                    "x.com.samsung.da.filter.airdust",
                                                ],
                                                if: [
                                                    "oic.if.baseline",
                                                    "oic.if.a",
                                                ],
                                                "x.com.samsung.da.filterUsage":
                                                    "3",
                                                "x.com.samsung.da.filterUsageResolution":
                                                    "1",
                                                "x.com.samsung.da.filterDesiredUsage":
                                                    "500",
                                                "x.com.samsung.da.filterStatus":
                                                    "normal",
                                                "x.com.samsung.da.filterCapacity":
                                                    "500",
                                                "x.com.samsung.da.filterCapacityUnit":
                                                    "Hour",
                                                "x.com.samsung.da.filterResetType":
                                                    ["replaceable", "washable"],
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
                    },
                ]}
            />
            {/* <ExportTable selectedPaths={selectedPaths} data={yourDataArray} /> */}
        </div>
    );
};

export default DocumentTree;
