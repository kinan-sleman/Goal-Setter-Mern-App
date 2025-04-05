import { toast } from "react-toastify";

const method = {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
};

const toJsonStr = (val: object) => JSON.stringify(val);
const makeRequest = async (
    endpoint: string,
    methodType: string,
    body?: Record<string, string>,
    useFormEncoded: boolean = false
): Promise<any> => {
    const headers: {
        Accept: string;
        "Content-Type": string;
        Authorization?: string;
    } = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    if (useFormEncoded) {
        headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    const token = window.localStorage.getItem("token");
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    let requestBody: string | FormData | URLSearchParams | null = null;
    if (useFormEncoded && body) {
        requestBody = new URLSearchParams();
        for (const key in body) {
            requestBody.append(key, body[key]);
        }
    } else if (body?.isFileUpload) {
        requestBody = body.formData;
    } else if (body) {
        requestBody = JSON.stringify(body);
    }
    try {
        const response = await fetch(`${import.meta.env.API_BASE_URI}` + endpoint, {
            method: methodType,
            headers,
            body: requestBody || null,
        });
        if (!response.ok) {
            const errorData = await response.json();
            toast.error(errorData.message);
            return Promise.reject(errorData);
        }
        const jsonResponse = await response.json();
        return jsonResponse;

    } catch (error) {
        toast.error("An error accorded ");
        return Promise.reject(error);
    }
};


const formDataRequest = async (endpoint: string, methodType: string, body: FormData | null = null) => {
    const response = await fetch(`${import.meta.env.API_BASE_URI}` + endpoint, {
        method: methodType,
        body: body || null,
    });
    const jsonResponse = await response.json();
    return jsonResponse;
};

export { method, toJsonStr, makeRequest, formDataRequest };
