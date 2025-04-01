import { validateResponse } from "../utils/responseValidator";
import { UserType } from "../types/UserType";
import { apiUrl } from "./api_url"

export const getUser = async (): Promise<UserType> => {
    return fetch(`${apiUrl}/user`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => validateResponse(res))    
        .then((res) => res.json());
}