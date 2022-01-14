import React, {useEffect, useState} from "react";
import {FC} from "react";
import TopPanel from "../components/top-panel/top-panel";
import SidePanel from "../components/side-panel/side-panel";
import MainPanel from "../components/main-panel/main-panel";
import {EmissionData, Prediction} from "./poland";
import {fetchCountryPredict, fetchCountryRawData} from "../http/countries";

const Countries: FC = () => {
    const [year, setYear] = useState<number|null>(null);
    const [countryId, setCountryId] = useState<string>('');
    const [data, setData] = useState<EmissionData[]>([]);
    const [prediction, setPrediction] = useState<Prediction>({emission: 21370});

    useEffect(() => {
        async function fetchData () {
            const response = await fetchCountryPredict(countryId!, year!);
            setPrediction({emission: await response.json()});
        }

        if(year && countryId) {
            fetchData();
        }
    }, [year, countryId])

    useEffect(() => {
        async function fetchData () {
            const response = await fetchCountryRawData(countryId!);
            setData(await response.json());
        }

        if(countryId) {
            fetchData();
        }
    }, [countryId]);

    return <div style={{height: '94vh'}}>
        <TopPanel data={data}/>
        <div style={{display: 'flex', height: '84vh', borderTop: '1px solid lightgrey'}}>
            <SidePanel
                setYear={setYear}
                minYear={1970}
                maxYear={2100}
                setNext={setCountryId}
                nextOptions={countries}
                chosenNext={countryId}
                nextLabel={"Wybierz kraj aby przeprowadzić predykcję"}
                nextType={"kraj"}
            />
            <MainPanel year={year} data={data} prediction={prediction} country={countryId ? countries[parseInt(countryId)].label : ''}/>
        </div>
    </div>
}

export default Countries;

const countries = [
    {id: "0", label: "Afghanistan"},
    {id: "1", label: "Albania"},
    {id: "2", label: "Algeria"},
    {id: "3", label: "American Samoa"},
    {id: "4", label: "Andorra"},
    {id: "5", label: "Angola"},
    {id: "6", label: "Antigua and Barbuda"},
    {id: "7", label: "Argentina"},
    {id: "8", label: "Armenia"},
    {id: "9", label: "Aruba"},
    {id: "10", label: "Australia"},
    {id: "11", label: "Austria"},
    {id: "12", label: "Azerbaijan"},
    {id: "13", label: "Bahamas, The"},
    {id: "14", label: "Bahrain"},
    {id: "15", label: "Bangladesh"},
    {id: "16", label: "Barbados"},
    {id: "17", label: "Belarus"},
    {id: "18", label: "Belgium"},
    {id: "19", label: "Belize"},
    {id: "20", label: "Benin"},
    {id: "21", label: "Bermuda"},
    {id: "22", label: "Bhutan"},
    {id: "23", label: "Bolivia"},
    {id: "24", label: "Bosnia and Herzegovina"},
    {id: "25", label: "Botswana"},
    {id: "26", label: "Brazil"},
    {id: "28", label: "Brunei Darussalam"},
    {id: "29", label: "Bulgaria"},
    {id: "30", label: "Burkina Faso"},
    {id: "31", label: "Burundi"},
    {id: "33", label: "Cambodia"},
    {id: "34", label: "Cameroon"},
    {id: "35", label: "Canada"},
    {id: "32", label: "Cabo Verde"},
    {id: "36", label: "Cayman Islands"},
    {id: "37", label: "Central African Republic"},
    {id: "38", label: "Chad"},
    {id: "39", label: "Chile"},
    {id: "40", label: "China"},
    {id: "41", label: "Colombia"},
    {id: "42", label: "Comoros"},
    {id: "44", label: "Congo, Rep."},
    {id: "43", label: "Congo, Dem. Rep."},
    {id: "45", label: "Costa Rica"},
    {id: "46", label: "Cote dIvoire"},
    {id: "47", label: "Croatia"},
    {id: "48", label: "Cuba"},
    {id: "49", label: "Cyprus"},
    {id: "50", label: "Czech Republic"},
    {id: "51", label: "Denmark"},
    {id: "52", label: "Djibouti"},
    {id: "53", label: "Dominica"},
    {id: "54", label: "Dominican Republic"},
    {id: "55", label: "Ecuador"},
    {id: "56", label: "Egypt, Arab Rep."},
    {id: "57", label: "El Salvador"},
    {id: "58", label: "Equatorial Guinea"},
    {id: "59", label: "Eritrea"},
    {id: "60", label: "Estonia"},
    {id: "62", label: "Ethiopia"},
    {id: "63", label: "Faroe Islands"},
    {id: "64", label: "Fiji"},
    {id: "65", label: "Finland"},
    {id: "66", label: "France"},
    {id: "67", label: "French Polynesia"},
    {id: "68", label: "Gabon"},
    {id: "69", label: "Gambia, The"},
    {id: "70", label: "Georgia"},
    {id: "71", label: "Germany"},
    {id: "72", label: "Ghana"},
    {id: "73", label: "Gibraltar"},
    {id: "74", label: "Greece"},
    {id: "75", label: "Greenland"},
    {id: "76", label: "Grenada"},
    {id: "77", label: "Guam"},
    {id: "78", label: "Guatemala"},
    {id: "79", label: "Guinea"},
    {id: "80", label: "Guinea-Bissau"},
    {id: "81", label: "Guyana"},
    {id: "82", label: "Haiti"},
    {id: "83", label: "Honduras"},
    {id: "84", label: "Hong Kong SAR, China"},
    {id: "85", label: "Hungary"},
    {id: "86", label: "Iceland"},
    {id: "87", label: "India"},
    {id: "88", label: "Indonesia"},
    {id: "89", label: "Iran, Islamic Rep."},
    {id: "90", label: "Iraq"},
    {id: "91", label: "Ireland"},
    {id: "92", label: "Israel"},
    {id: "93", label: "Italy"},
    {id: "94", label: "Jamaica"},
    {id: "95", label: "Japan"},
    {id: "96", label: "Jordan"},
    {id: "97", label: "Kazakhstan"},
    {id: "98", label: "Kenya"},
    {id: "99", label: "Kiribati"},
    {id: "100", label: "Korea, Dem. People’s Rep."},
    {id: "101", label: "Korea, Rep."},
    {id: "102", label: "Kuwait"},
    {id: "103", label: "Kyrgyz Republic"},
    {id: "104", label: "Lao PDR"},
    {id: "105", label: "Latvia"},
    {id: "106", label: "Lebanon"},
    {id: "107", label: "Lesotho"},
    {id: "108", label: "Liberia"},
    {id: "109", label: "Libya"},
    {id: "110", label: "Lithuania"},
    {id: "111", label: "Luxembourg"},
    {id: "112", label: "Macao SAR, China"},
    {id: "138", label: "North Macedonia"},
    {id: "113", label: "Madagascar"},
    {id: "114", label: "Malawi"},
    {id: "115", label: "Malaysia"},
    {id: "116", label: "Maldives"},
    {id: "117", label: "Mali"},
    {id: "118", label: "Malta"},
    {id: "119", label: "Marshall Islands"},
    {id: "120", label: "Mauritania"},
    {id: "121", label: "Mauritius"},
    {id: "122", label: "Mexico"},
    {id: "123", label: "Micronesia, Fed. Sts."},
    {id: "124", label: "Moldova"},
    {id: "125", label: "Mongolia"},
    {id: "126", label: "Morocco"},
    {id: "127", label: "Mozambique"},
    {id: "128", label: "Myanmar"},
    {id: "129", label: "Namibia"},
    {id: "130", label: "Nauru"},
    {id: "131", label: "Nepal"},
    {id: "132", label: "Netherlands"},
    {id: "133", label: "New Caledonia"},
    {id: "134", label: "New Zealand"},
    {id: "135", label: "Nicaragua"},
    {id: "136", label: "Niger"},
    {id: "137", label: "Nigeria"},
    {id: "139", label: "Northern Mariana Islands"},
    {id: "140", label: "Norway"},
    {id: "141", label: "Oman"},
    {id: "142", label: "Pakistan"},
    {id: "143", label: "Palau"},
    {id: "144", label: "Panama"},
    {id: "145", label: "Papua New Guinea"},
    {id: "146", label: "Paraguay"},
    {id: "147", label: "Peru"},
    {id: "148", label: "Philippines"},
    {id: "149", label: "Poland"},
    {id: "150", label: "Portugal"},
    {id: "151", label: "Puerto Rico"},
    {id: "152", label: "Qatar"},
    {id: "153", label: "Romania"},
    {id: "154", label: "Russian Federation"},
    {id: "155", label: "Rwanda"},
    {id: "171", label: "St. Kitts and Nevis"},
    {id: "172", label: "St. Lucia"},
    {id: "173", label: "St. Vincent and the Grenadines"},
    {id: "156", label: "Samoa"},
    {id: "157", label: "Sao Tome and Principe"},
    {id: "158", label: "Saudi Arabia"},
    {id: "159", label: "Senegal"},
    {id: "160", label: "Serbia"},
    {id: "161", label: "Seychelles"},
    {id: "162", label: "Sierra Leone"},
    {id: "163", label: "Singapore"},
    {id: "164", label: "Slovak Republic"},
    {id: "165", label: "Slovenia"},
    {id: "166", label: "Solomon Islands"},
    {id: "167", label: "Somalia"},
    {id: "168", label: "South Africa"},
    {id: "169", label: "Spain"},
    {id: "170", label: "Sri Lanka"},
    {id: "174", label: "Sudan"},
    {id: "175", label: "Suriname"},
    {id: "61", label: "Eswatini"},
    {id: "176", label: "Sweden"},
    {id: "177", label: "Switzerland"},
    {id: "178", label: "Syrian Arab Republic"},
    {id: "179", label: "Tajikistan"},
    {id: "180", label: "Tanzania"},
    {id: "181", label: "Thailand"},
    {id: "182", label: "Timor-Leste"},
    {id: "183", label: "Togo"},
    {id: "184", label: "Tonga"},
    {id: "185", label: "Trinidad and Tobago"},
    {id: "186", label: "Tunisia"},
    {id: "187", label: "Turkey"},
    {id: "188", label: "Turkmenistan"},
    {id: "189", label: "Turks and Caicos Islands"},
    {id: "190", label: "Tuvalu"},
    {id: "191", label: "Uganda"},
    {id: "192", label: "Ukraine"},
    {id: "193", label: "United Arab Emirates"},
    {id: "194", label: "United Kingdom"},
    {id: "195", label: "United States"},
    {id: "196", label: "Uruguay"},
    {id: "197", label: "Uzbekistan"},
    {id: "198", label: "Vanuatu"},
    {id: "199", label: "Venezuela, RB"},
    {id: "200", label: "Vietnam"},
    {id: "27", label: "British Virgin Islands"},
    {id: "201", label: "Virgin Islands (U.S.)"},
    {id: "202", label: "Yemen, Rep."},
    {id: "203", label: "Zambia"},
    {id: "204", label: "Zimbabwe"},
];