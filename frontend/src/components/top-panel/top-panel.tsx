import React from "react";
import {FC} from "react";
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {EmissionData} from "../../views/poland";

interface TopPanelProps {
    data: EmissionData[],
}

const TopPanel: FC<TopPanelProps> = ({data}) => {
    const cards = data.filter((item, index) => index % 4 === 0 ).map((item, index, collection) => {
        const diffValue = collection[index-1] ? Math.round(item.emission - collection[index-1].emission) : 0;
        const beforeSign = diffValue > 0 ? '+' : '';

        return (
            <ListItem key={index}>
                <ListItemText
                    primary={
                        <>
                            {Math.round(item.emission)}&nbsp;
                            <span style={{color: diffValue > 0 ? 'red' : 'green'}}>({beforeSign+diffValue})</span>
                        </>
                    }
                    secondary={item.year}
                    style={{width: '100%', textAlign: 'center'}}
                />
            </ListItem>
        )});

    return <List style={{display: 'flex', flexDirection: 'row', padding: 0, height: '10vh'}}>
        {cards}
    </List>
};

export default TopPanel;