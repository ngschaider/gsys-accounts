export const setCookie = (name: string, value: string, optional: string = ";Domain=.gsys.at;max-age=31536000") => {
    document.cookie = name + "=" + encodeURIComponent(value) + optional;
};

export const deleteCookie = (name: string) => {
    document.cookie = name + "=expired;Domain=.gsys.at;expires=Thu, 01 Jan 1970 00:00:01 GMT";  
}