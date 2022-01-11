export const fetchCountryRawData = (countryId: string): Promise<Response> => {
    return fetch('/api/countries/1/raw');
};

export const fetchCountryPredict = (countryId: string, year: number): Promise<Response> => {
    return fetch('/api/countries/1/predict/'+year);
};