import React, {FC} from 'react';
import {Route, Routes } from 'react-router-dom';
import Poland from "./views/poland";
import NavigationBar from "./components/navigation-bar";

const App: FC = () => {
  return (
    <div className="App">
        <NavigationBar/>
        <Routes>
            <Route path="/" element={<Poland/>}/>
            <Route path="/continents" element={<Poland/>}/>
            <Route path="/countries" element={<Poland/>}/>
        </Routes>
    </div>
  );
}

export default App;
