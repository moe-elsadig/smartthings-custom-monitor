import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import * as XLSX from "xlsx";

const ExportTable = ({ data, columns }) => {
    function getValueByPath(obj, path) {
        return path.split(".").reduce((acc, key) => acc && acc[key], obj);
    }

    // console.log("columns", columns);
    // console.log("data", data);

    const handleExportClick = () => {
        let dataRecords = [];
        axios
            .get("/data")
            .then((res) => {
                // console.log(res.data.length);
                dataRecords = res.data.dataRecords;
            })
            .then(() => {
                const wb = XLSX.utils.book_new();

                // Extract data for selected columns
                const exportData = dataRecords.map((item) => {
                    return columns.map((col) => getValueByPath(item, col));
                });

                // console.log("exportData", exportData);
                // Add headers to the data
                let headers = columns.map((col) =>
                    col.replace("components.main.", "")
                );
                const wsData = [headers, ...exportData];

                const ws = XLSX.utils.aoa_to_sheet(wsData);
                XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
                XLSX.writeFile(wb, "exported_table.xlsx");
            });
    };

    return (
        <div>
            <Button variant="contained" onClick={handleExportClick}>
                Export to Excel
            </Button>
        </div>
    );
};

export default ExportTable;
