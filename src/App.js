import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DocumentTree from "./components/DocumentTree";
import { Grid } from "@mui/material";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
    const [sample, setSample] = useState({ A: "BCD", B: { C: "D", E: "F" } });

    useEffect(() => {
        axios.get("/sample").then((res) => {
            // console.log(res.data);
            setSample(res.data);
        });
    }, []);

    return (
        <div className="App">
            <Grid container></Grid>
            <div style={{ padding: 10 }}>
                <DocumentTree data={sample} />
            </div>
        </div>
    );
}

export default App;
