export const fetchContinentRawData = (continentId: string): Promise<Response> => {
    return fetch('/api/continents/'+continentId+'/raw');
};

export const fetchContinentPredict = (continentId: string, year: number): Promise<Response> => {
    return fetch('/api/continents/'+continentId+'/predict/'+year);
};