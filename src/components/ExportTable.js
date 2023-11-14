import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import * as Papa from "papaparse";

const ExportTable = ({ data, columns }) => {
    function getValueByPath(obj, path) {
        return path.split(".").reduce((acc, key) => acc && acc[key], obj);
    }

    const handleExportClick = () => {
        let dataRecords = [];
        axios
            .get("/data")
            .then((res) => {
                dataRecords = res.data.dataRecords;
            })
            .then(() => {
                // Extract data for selected columns
                const exportData = dataRecords.map((item) => {
                    return columns.map((col) => getValueByPath(item, col));
                });

                // Add headers to the data
                let headers = columns.map((col) =>
                    col.replace("components.main.", "")
                );
                const csvData = [headers, ...exportData];

                // Convert data to CSV format
                const csv = Papa.unparse(csvData);

                // Create a Blob containing the CSV data
                const blob = new Blob([csv], {
                    type: "text/csv;charset=utf-8;",
                });

                // Create a download link and trigger a click event to download the CSV file
                const link = document.createElement("a");
                if (link.download !== undefined) {
                    const url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", "exported_table.csv");
                    link.style.visibility = "hidden";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            });
    };

    return (
        <div>
            <Button variant="contained" onClick={handleExportClick}>
                Export to CSV
            </Button>
        </div>
    );
};

export default ExportTable;
