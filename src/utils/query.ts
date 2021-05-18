export const buildQueryString = (data: Record<string,string>) => {
    const kvPairs = Object.entries(data);
    const encodedParts = kvPairs.map(kv => {
        return encodeURIComponent(kv[0]) + "=" + encodeURIComponent(kv[1]);
    });

    return "?" + encodedParts.join("&");
}

export const getQueryParameter = (parameterName: string): string|null => {
    const encodedParts = window.location.search.substr(1).split("&");
    const kvPairs = encodedParts.map(encodedPart => encodedPart.split("="));

    const kv = kvPairs.find(kv => kv[0] === parameterName);
    
    return kv ? decodeURIComponent(kv[1]) : null;
}