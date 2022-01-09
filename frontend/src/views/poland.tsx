import React from "react";
import {FC} from "react";
import TopPanel from "../components/top-panel/top-panel";
import SidePanel from "../components/side-panel/side-panel";

const Poland: FC = () => {
    return <div style={{height: '94vh'}}>
        <TopPanel/>
        <div style={{display: 'flex', height: '84vh', borderTop: '1px solid lightgrey'}}>
            <SidePanel/>
        </div>
    </div>
}

export default Poland;