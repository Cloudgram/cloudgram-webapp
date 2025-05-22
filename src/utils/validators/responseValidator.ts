interface ErrorResponse {
    detail: {
        msg: string;
    };
}

interface ApiError extends Error {
    response: ErrorResponse;
    status: number;
}

export async function validateResponse(response: Response): Promise<Response> {
    if (!response) {
        throw new Error('Network response was not ok.');
    }

    if (!response.ok) {
        const errorData: ErrorResponse = await response.json();

        const error = new Error() as ApiError;
        error.status = response.status;
        error.response = errorData;

        // Используем сообщение из ответа сервера
        error.message = errorData.detail.msg;

        throw error;
    }

    return response;
}
