const appendUrlParams = ({ baseUrl, params }: { baseUrl: string; params: { [key: string]: unknown } }) => {
    return `${baseUrl}${encodeURIComponent(JSON.stringify(params))}`
}

export default appendUrlParams