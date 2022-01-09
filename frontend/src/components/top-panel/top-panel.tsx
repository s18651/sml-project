import React, {useEffect, useState} from "react";
import {FC} from "react";
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {fetchPolandRawData} from "../../http/poland";

interface EmissionData {
    year: number,
    emission: number,
}

const TopPanel: FC = () => {
    const [data, setData] = useState<EmissionData[]>([]);
    useEffect(() => {
        async function fetchData () {
            const response = await fetchPolandRawData();
            setData(await response.json());
        }

        fetchData();
    }, [])

    const cards = data.filter((item, index) => index % 4 === 0 ).map((item, index, collection) => {
        const diffValue = collection[index-1] ? Math.round(item.emission - collection[index-1].emission) : 0;
        const beforeSign = diffValue > 0 ? '+' : '';

        return (
            <ListItem style={{display: 'flex'}}>
                <ListItemText primary={Math.round(item.emission)} secondary={item.year} style={{marginRight: 0}}/>
                <Typography
                    style={{color: diffValue > 0 ? 'red' : 'green'}}
                >{beforeSign+diffValue}</Typography>
            </ListItem>
        )});

    return <List style={{display: 'flex', flexDirection: 'row'}}>
        {cards}
    </List>
};

export default TopPanel;