import React, { useEffect, useState } from "react";
import {
    Button,
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
    const [selectedPaths, setSelectedPaths] = useState([]);
    const [savedPaths, setSavedPaths] = useState([]);

    const handleAddToSelected = (path) => {
        setSelectedPaths((prevPaths) => [
            ...prevPaths,
            path.replace("components.components.", "components."),
        ]);
        setSavedPaths((prevPaths) => [
            ...prevPaths,
            path.replace("components.components.", "components."),
        ]);
    };

    useEffect(() => {
        if (savedPaths.length) {
            localStorage.setItem(
                "previousSelection",
                JSON.stringify(savedPaths)
            );
        }
    }, [savedPaths]);

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
                            primary={`|\t${"_\t\t_\t\t_".repeat(
                                (path.match(/\./g) || []).length
                            )}${path.split(".").pop()}: ${JSON.stringify(
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
            }

            return (
                <React.Fragment key={path}>
                    <ListItem onClick={() => handleToggle(path)}>
                        <ListItemText
                            primary={`|\t${"_\t\t_\t\t_".repeat(
                                (path.match(/\./g) || []).length
                            )}${path.split(".").pop()}`}
                        />
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
                        <ListItem dense key={path}>
                            <ListItemText primary={path} />
                        </ListItem>
                    ))}
                </List>
            </div>

            <Button
                onClick={() =>
                    setSelectedPaths([
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
                    ])
                }
            >
                Default Selection
            </Button>
            <Button
                onClick={() => {
                    let oldSelection =
                        JSON.parse(localStorage.getItem("previousSelection")) ||
                        [];
                    setSelectedPaths(oldSelection);
                    setSavedPaths(oldSelection);
                }}
            >
                Previous Selection
            </Button>
            <Button onClick={() => setSelectedPaths([])}>
                Clear Selection
            </Button>
            <ExportTable columns={selectedPaths} />
            {/* <ExportTable selectedPaths={selectedPaths} data={yourDataArray} /> */}
        </div>
    );
};

export default DocumentTree;
