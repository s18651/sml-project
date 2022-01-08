import React from "react";
import {FC} from "react";
import {AppBar, Box, MenuItem, Typography} from "@mui/material";
import {Link} from "react-router-dom";

interface View {
    index: string,
    label: string,
    link: string,
}

const views: View[] = [
    {index: 'poland', label: 'Polska', link: '/'},
    {index: 'continents', label: 'Kontynenty', link: '/continents'},
    {index: 'countries', label: 'Inne kraje', link: '/countries'},
]

const NavigationBar: FC = () => {

    return (
        <AppBar position="static" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '10px'}}>
            <Typography
                variant="h5"
                noWrap
            >
                Emission Study
            </Typography>
            <Box style={{display: 'flex', marginLeft: '3%', height: '100%'}}>
                {views.map(view => (
                    <Link to={view.link} key={view.index}>
                        <MenuItem key={view.index} style={{minHeight: '60px'}}>
                            {view.label}
                        </MenuItem>
                    </Link>
                ))}
            </Box>
        </AppBar>
    );
}

export default NavigationBar;