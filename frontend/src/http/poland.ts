export const fetchPolandRawData = (): Promise<Response> => {
    return fetch('/api/poland/raw');
};