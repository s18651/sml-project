export const fetchContinentRawData = (continentId: string): Promise<Response> => {
    return fetch('/api/continents/1/raw');
};

export const fetchContinentPredict = (continentId: string, year: number): Promise<Response> => {
    return fetch('/api/continents/1/predict/'+year);
};