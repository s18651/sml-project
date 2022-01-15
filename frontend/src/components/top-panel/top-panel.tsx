import React from "react";
import {FC} from "react";
import {List, ListItem, ListItemText, Typography} from "@mui/material";
import {EmissionData} from "../../views/poland";

interface TopPanelProps {
    data: EmissionData[],
    secondData?: EmissionData[],
    firstName: string,
    secondName?: string,
}

const TopPanel: FC<TopPanelProps> = ({data, secondData= [], firstName='', secondName=''}) => {
    const cards = data.filter((item, index) => index % 4 === 0 ).map((item, index, collection) => {
        const diffValue = collection[index-1] ? Math.round(item.emission - collection[index-1].emission) : 0;
        const beforeSign = diffValue > 0 ? '+' : '';
        const secondCollection = secondData.filter((secondItem, secondIndex) => secondIndex % 4 === 0 );
        const secondDiffValue = secondCollection.length > 0 && secondCollection.length > 0 ? (secondCollection[index-1] ? Math.round(secondCollection[index].emission - secondCollection[index-1].emission) : 0) : 0;
        const secondBeforeSign = secondDiffValue && secondDiffValue > 0 ? '+' : '';

        return (
            <ListItem key={index}>
                <ListItemText
                    primary={
                        <>
                            <p>
                                {Math.round(item.emission)}&nbsp;
                                <span style={{color: diffValue > 0 ? 'red' : 'green'}}>({beforeSign+diffValue})</span>
                            </p>
                            {secondCollection.length > 0 &&
                                <p>
                                    {Math.round(secondCollection[index].emission)}&nbsp;
                                    <span
                                        style={{color: secondDiffValue > 0 ? 'red' : 'green'}}>({secondBeforeSign + secondDiffValue})</span>
                                </p>
                            }
                        </>
                    }
                    secondary={item.year}
                    style={{width: '100%', textAlign: 'center'}}
                />
            </ListItem>
        )});

    return <List style={{display: 'flex', flexDirection: 'row', padding: 0, height: '10vh', justifyContent: 'center'}}>
        {data.length > 0 ?
            <>
                <ListItem key={'wefwefwef'} style={{width: '200%'}}>
                    <ListItemText
                        primary={
                            <>
                                <p>{firstName}</p>
                                {
                                    secondData.length > 0 &&
                                    <p>{secondName}</p>
                                }
                            </>
                        }
                        secondary={'rok'}
                        style={{width: '100%', textAlign: 'center'}}
                    />
                </ListItem>
                {cards}
            </>
        : <ListItem style={{maxWidth: '390px', textAlign: 'center'}}>Wybierz odpowiednie dane aby wyświetlić zawartość</ListItem>}
    </List>
};

export default TopPanel;