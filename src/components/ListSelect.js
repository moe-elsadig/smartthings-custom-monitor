import { ListItemButton, ListItemText } from "@mui/material";
import React from "react";

function ListSelect() {
    return (
        <div>
            <ListItemButton>
                <ListItemText primary="Drafts" />
            </ListItemButton>
        </div>
    );
}

export default ListSelect;
