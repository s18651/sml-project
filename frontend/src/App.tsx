import React, {FC} from 'react';
import {Route, Routes } from 'react-router-dom';
import Poland from "./views/poland";
import NavigationBar from "./components/navigation-bar";
import Continents from "./views/continents";
import Countries from "./views/countries";

const App: FC = () => {
  return (
    <div className="App">
        <NavigationBar/>
        <Routes>
            <Route path="/" element={<Poland/>}/>
            <Route path="/continents" element={<Continents/>}/>
            <Route path="/countries" element={<Countries/>}/>
        </Routes>
    </div>
  );
}

export default App;
