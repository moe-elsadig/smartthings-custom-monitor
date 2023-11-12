import "./App.css";
import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@mui/material";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    axios.defaults.baseURL = "http://localhost:3001/api";

    const [open, setOpen] = useState(true);
    const [sample, setSample] = useState(null);

    useEffect(() => {
        axios.get("/sample").then((res) => {
            console.log(res);
        });
    }, []);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div className="App">
            <List
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Samsung AC Data list
                    </ListSubheader>
                }
            >
                <ListItemButton>
                    <ListItemText primary="Drafts" />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                    <ListItemText primary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </div>
    );
}

export default App;
