import React from "react";
import {FC} from "react";

const curiosities: string[] = [
    'The concentration of carbon dioxide (CO2) in our atmosphere, as of July 2021, is the highest it has been in human history.',
    'Eleven percent of all global greenhouse gas emissions caused by humans are due to deforestation — comparable to the emissions from all of the passenger vehicles on the planet.',
    'Tropical forests are incredibly effective at storing carbon, providing at least a third of the mitigation action needed 7 to prevent the worst climate change scenarios. Yet nature-based solutions receive only 3% of all climate funding.',
    'Natural climate solutions such as restoring degraded forests could create as many as 39 jobs per million dollars spent — that\'s a job-creation rate more than six times higher than the oil and gas industry.',
    'The CO2 in our atmosphere is odourless and tasteless. This is because it is at such a low concentration that we are accustomed to it; but if you were to increase the amount of CO2 available in the air, you would notice a sharp acidic smell and taste.',
    'Carbon dioxide is used to produce carbonated soft drinks and sparkling water, such as Coca-Cola. As beer gas, carbon dioxide is typically used to transfer beer from kegs to dispensing taps via pressurised carbon dioxide.',
    'Carbon dioxide is the shielding gas for a CO2 laser. These lasers tend to be quite large which makes them difficult to use for precision, but they are very powerful, which can be useful for cutting through thick metal.',
    'More than 1 million species are at risk of extinction by climate change'
];

const CuriosityDisplayer: FC = () => {
    return <div><span style={{color: 'grey'}}>ciekawostka:</span> {curiosities[Math.floor(Math.random()*curiosities.length)]}</div>
}

export default CuriosityDisplayer;