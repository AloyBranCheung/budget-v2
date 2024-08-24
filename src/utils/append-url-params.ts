const appendUrlParams = ({ baseUrl, params }: { baseUrl: string; params: { [key: string]: unknown } }) => {
    // returns full url 
    return `${baseUrl}?jsonData=${JSON.stringify(encodeURI(JSON.stringify(params)))}`
}

export const decodedUrlParams = (encodedFullUrl: string) => {
    return JSON.parse(decodeURIComponent(JSON.parse(encodedFullUrl.split('?jsonData=')[1])))
}

export default appendUrlParams