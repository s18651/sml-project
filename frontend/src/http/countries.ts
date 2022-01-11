export const fetchCountryRawData = (countryId: string): Promise<Response> => {
    return fetch('/api/countries/'+countryId+'/raw');
};

export const fetchCountryPredict = (countryId: string, year: number): Promise<Response> => {
    return fetch('/api/countries/'+countryId+'/predict/'+year);
};