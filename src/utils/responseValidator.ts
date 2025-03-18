export async function validateResponse(response: Response): Promise<Response> {
    if (!response) {
        throw new Error('Network response was not ok.');
    }

    if (response.status === 404) {
        throw new Error('404 Not Found');
    }

    if (response.status === 500) {
        throw new Error('500 Internal Server Error');
    }

    if(!response.ok) {
        throw new Error(await response.text());
    }

    return response
}