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
    const [secondCountryId, setSecondCountryId] = useState<string>('');
    const [data, setData] = useState<EmissionData[]>([]);
    const [secondData, setSecondData] = useState<EmissionData[]>([]);
    const [prediction, setPrediction] = useState<Prediction>({emission: 0});

    useEffect(() => {
        async function fetchData () {
            const response = await fetchCountryPredict(countryId!, year!);
            const emission = await response.json();
            setPrediction({emission: emission < 0 ? 0 : emission});
        }

        if(year && countryId) {
            fetchData();
        }
    }, [year, countryId, secondCountryId])

    useEffect(() => {
        async function fetchData () {
            const response = await fetchCountryRawData(countryId!);
            setData(await response.json());
        }

        async function fetchSecondData () {
            const response = await fetchCountryRawData(secondCountryId!);
            setSecondData(await response.json());
        }

        if(countryId) {
            fetchData();
        }

        if(secondCountryId) {
            fetchSecondData();
        }
    }, [countryId, secondCountryId]);

    return <div style={{height: '94vh'}}>
        <TopPanel
            data={data}
            secondData={secondData}
            firstName={countryId ? countries.filter(country => country.id === countryId)[0].label : ''}
            secondName={secondCountryId ? countries.filter(country => country.id === secondCountryId)[0].label : ''}
        />
        <div style={{display: 'flex', height: '84vh', borderTop: '1px solid lightgrey'}}>
            <SidePanel
                yearLabel={"Wybierz rok aby porównać emisję"}
                setYear={setYear}
                minYear={1970}
                maxYear={2012}
                setNext={setCountryId}
                nextOptions={countries}
                chosenNext={countryId}
                nextLabel={"Wybierz kraj aby porównać emisję"}
                nextType={"kraj"}
                secondNext={true}
                setSecondNext={setSecondCountryId}
                chosenSecondNext={secondCountryId}
            />
            <MainPanel
                year={year}
                data={data}
                prediction={prediction}
                country={countryId ? countries.filter(country => country.id === countryId)[0].label : ''}
                secondData={secondData}
                secondCountry={secondCountryId ? countries.filter(country => country.id === secondCountryId)[0].label : ''}
            />
        </div>
    </div>
}

export default Countries;

const countries = [
    {id: "0", label: "Afganistan"},
    {id: "1", label: "Albania"},
    {id: "2", label: "Algieria"},
    {id: "3", label: "Samoa Amerykańskie"},
    {id: "4", label: "Andora"},
    {id: "5", label: "Angola"},
    {id: "6", label: "Antigua i Barbuda"},
    {id: "7", label: "Argentyna"},
    {id: "8", label: "Armenia"},
    {id: "9", label: "Aruba"},
    {id: "10", label: "Australia"},
    {id: "11", label: "Austria"},
    {id: "12", label: "Azerbejdżan"},
    {id: "13", label: "Bahamy"},
    {id: "14", label: "Bahrajn"},
    {id: "15", label: "Bangladesz"},
    {id: "16", label: "Barbados"},
    {id: "17", label: "Białoruś"},
    {id: "18", label: "Belgia"},
    {id: "19", label: "Belize"},
    {id: "20", label: "Benin"},
    {id: "21", label: "Bermuda"},
    {id: "22", label: "Bhutan"},
    {id: "23", label: "Boliwia"},
    {id: "24", label: "Bośnia i Hercegowina"},
    {id: "25", label: "Botswana"},
    {id: "26", label: "Brazylia"},
    {id: "28", label: "Brunei Darussalam"},
    {id: "29", label: "Bułgaria"},
    {id: "30", label: "Burkina Faso"},
    {id: "31", label: "Burundi"},
    {id: "33", label: "Kambodża"},
    {id: "34", label: "Kamerun"},
    {id: "35", label: "Kanada"},
    {id: "32", label: "Wyspy Zielonego Przylądka"},
    {id: "36", label: "Kajmany"},
    {id: "37", label: "Republika Środkowoafrykańska"},
    {id: "38", label: "Czad"},
    {id: "39", label: "Chile"},
    {id: "40", label: "Chiny"},
    {id: "41", label: "Kolumbia"},
    {id: "42", label: "Comoros"},
    {id: "44", label: "Republika Konga"},
    {id: "43", label: "Demokratyczna Republika Konga"},
    {id: "45", label: "Kostaryka"},
    {id: "46", label: "Wybrzeże Kości Słoniowej"},
    {id: "47", label: "Chorwacja"},
    {id: "48", label: "Kuba"},
    {id: "49", label: "Cypr"},
    {id: "50", label: "Republika Czeska"},
    {id: "51", label: "Dania"},
    {id: "52", label: "Dżibuti"},
    {id: "53", label: "Dominika"},
    {id: "54", label: "Republika Dominikany"},
    {id: "55", label: "Ekwador"},
    {id: "56", label: "Egipt, Republika Arabska"},
    {id: "57", label: "El Salvador"},
    {id: "58", label: "Gwinea Równikowa"},
    {id: "59", label: "Erytrea"},
    {id: "60", label: "Estonia"},
    {id: "62", label: "Etiopia"},
    {id: "63", label: "Wyspy Owcze"},
    {id: "64", label: "Fidżi"},
    {id: "65", label: "Finlandia"},
    {id: "66", label: "Francja"},
    {id: "67", label: "Polinezja Francuska"},
    {id: "68", label: "Gabon"},
    {id: "69", label: "Gambia"},
    {id: "70", label: "Gruzja"},
    {id: "71", label: "Niemcy"},
    {id: "72", label: "Ghana"},
    {id: "73", label: "Gibraltar"},
    {id: "74", label: "Grecja"},
    {id: "75", label: "Grenlandia"},
    {id: "76", label: "Grenada"},
    {id: "77", label: "Guam"},
    {id: "78", label: "Gwatemala"},
    {id: "79", label: "Gwinea"},
    {id: "80", label: "Gwinea-Bissau"},
    {id: "81", label: "Gujana"},
    {id: "82", label: "Haiti"},
    {id: "83", label: "Honduras"},
    {id: "84", label: "Hong Kong SAR, Chiny"},
    {id: "85", label: "Węgry"},
    {id: "86", label: "Islandia"},
    {id: "87", label: "Indie"},
    {id: "88", label: "Indonezja"},
    {id: "89", label: "Iran"},
    {id: "90", label: "Irak"},
    {id: "91", label: "Irlandia"},
    {id: "92", label: "Izrael"},
    {id: "93", label: "Włochy"},
    {id: "94", label: "Jamajka"},
    {id: "95", label: "Japonia"},
    {id: "96", label: "Jordania"},
    {id: "97", label: "Kazachstan"},
    {id: "98", label: "Kenia"},
    {id: "99", label: "Kiribati"},
    {id: "100", label: "Korea Północna"},
    {id: "101", label: "Korea Południowa"},
    {id: "102", label: "Kuwejt"},
    {id: "103", label: "Republika Kirgistów"},
    {id: "104", label: "Laos"},
    {id: "105", label: "Łotwa"},
    {id: "106", label: "Liban"},
    {id: "107", label: "Lesotho"},
    {id: "108", label: "Liberia"},
    {id: "109", label: "Libia"},
    {id: "110", label: "Litwa"},
    {id: "111", label: "Luksemburg"},
    {id: "112", label: "Makau"},
    {id: "138", label: "Północna Macedonia"},
    {id: "113", label: "Madagaskar"},
    {id: "114", label: "Malawi"},
    {id: "115", label: "Malezja"},
    {id: "116", label: "Malediwy"},
    {id: "117", label: "Mali"},
    {id: "118", label: "Malta"},
    {id: "119", label: "Wyspy Marshalla"},
    {id: "120", label: "Mauretania"},
    {id: "121", label: "Mauritius"},
    {id: "122", label: "Meksyk"},
    {id: "123", label: "Mikronezja"},
    {id: "124", label: "Moldova"},
    {id: "125", label: "Mongolia"},
    {id: "126", label: "Maroko"},
    {id: "127", label: "Mozambik"},
    {id: "128", label: "Myanmar"},
    {id: "129", label: "Namibia"},
    {id: "130", label: "Nauru"},
    {id: "131", label: "Nepal"},
    {id: "132", label: "Holandia"},
    {id: "133", label: "Nowa Kaledonia"},
    {id: "134", label: "Nowa Zelandia"},
    {id: "135", label: "Nikaragua"},
    {id: "136", label: "Niger"},
    {id: "137", label: "Nigeria"},
    {id: "139", label: "Mariany Północne"},
    {id: "140", label: "Norwegia"},
    {id: "141", label: "Oman"},
    {id: "142", label: "Pakistan"},
    {id: "143", label: "Palau"},
    {id: "144", label: "Panama"},
    {id: "145", label: "Papua Nowa Gwinea"},
    {id: "146", label: "Paragwaj"},
    {id: "147", label: "Peru"},
    {id: "148", label: "Filipiny"},
    {id: "149", label: "Polska"},
    {id: "150", label: "Portugalia"},
    {id: "151", label: "Portoryko"},
    {id: "152", label: "Katar"},
    {id: "153", label: "Rumunia"},
    {id: "154", label: "Federacja Rosyjska"},
    {id: "155", label: "Rwanda"},
    {id: "171", label: "St. Kitts and Nevis"},
    {id: "172", label: "Św. Lucia"},
    {id: "173", label: "St. Vincent i Grenadyny"},
    {id: "156", label: "Samoa"},
    {id: "157", label: "Wyspy Świętego Tomasza i Książęca"},
    {id: "158", label: "Arabia Saudyjska"},
    {id: "159", label: "Senegal"},
    {id: "160", label: "Serbia"},
    {id: "161", label: "Seszele"},
    {id: "162", label: "Sierra Leone"},
    {id: "163", label: "Singapur"},
    {id: "164", label: "Słowacja"},
    {id: "165", label: "Słowenia"},
    {id: "166", label: "Wyspy Salomona"},
    {id: "167", label: "Somali"},
    {id: "168", label: "Afryka Południowa"},
    {id: "169", label: "Hiszpania"},
    {id: "170", label: "Sri Lanka"},
    {id: "174", label: "Sudan"},
    {id: "175", label: "Suriname"},
    {id: "61", label: "Eswatini"},
    {id: "176", label: "Szwecja"},
    {id: "177", label: "Szwajcaria"},
    {id: "178", label: "Republika Syryjsko-Arabska"},
    {id: "179", label: "Tadżykistan"},
    {id: "180", label: "Tanzania"},
    {id: "181", label: "Tajlandia"},
    {id: "182", label: "Timor Wschodni"},
    {id: "183", label: "Togo"},
    {id: "184", label: "Tonga"},
    {id: "185", label: "Trynidad i Tobago"},
    {id: "186", label: "Tunezja"},
    {id: "187", label: "Turcja"},
    {id: "188", label: "Turkmenia"},
    {id: "189", label: "Wyspy Turks i Caicos"},
    {id: "190", label: "Tuvalu"},
    {id: "191", label: "Uganda"},
    {id: "192", label: "Ukraina"},
    {id: "193", label: "Zjednoczone Emiraty Arabskie"},
    {id: "194", label: "Wielka Brytania"},
    {id: "195", label: "Stany Zjednoczone"},
    {id: "196", label: "Urugwaj"},
    {id: "197", label: "Uzbekistan"},
    {id: "198", label: "Vanuatu"},
    {id: "199", label: "Wenezuela"},
    {id: "200", label: "Wietnam"},
    {id: "27", label: "Brytyjskie Wyspy Dziewicze"},
    {id: "201", label: "Wyspy Dziewicze (U.S.)"},
    {id: "202", label: "Jemen"},
    {id: "203", label: "Zambia"},
    {id: "204", label: "Zimbabwe"},
];