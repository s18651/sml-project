export const fetchPolandRawData = (): Promise<Response> => {
    return fetch('/api/poland/raw');
};

export const fetchPolandPredict = (year: number): Promise<Response> => {
    return fetch('/api/poland/predict/'+year);
};