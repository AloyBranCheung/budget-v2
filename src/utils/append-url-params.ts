const appendUrlParams = ({ baseUrl, params }: { baseUrl: string; params: { [key: string]: unknown } }) => {
    // returns full url 
    return `${baseUrl}?jsonData=${encodeURIComponent(JSON.stringify(params))}`
}

export const decodedUrlParams = (encodeURIComponent: string) => {
    return JSON.parse(decodeURIComponent(encodeURIComponent.split('?jsonData=')[1]))
}

export default appendUrlParams