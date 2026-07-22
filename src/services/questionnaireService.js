import { BASE_URL } from "../constants";

const getToken = () => localStorage.getItem("token");

export const createQuestionnaire = async(answers) => {
    const res = await fetch(`${BASE_URL}/questionnaire`, {
        method: "POST",
        
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify({
            answers,
        }),
    });
    return res.json();
};

export const getQuestionnaire = async() => {
    const res = await fetch(`${BASE_URL}/questionnaire`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + getToken(),
        },
    });
    return res.json();
};

export const updateQuestionnaire = async(answers) => {
    const res = await fetch(`${BASE_URL}/questionnaire`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify({
            answers,
        }),
    });
    return res.json();
}

export const getClientQuestionnaire = async(clientId) => {
    const res = await fetch(`${BASE_URL}/trainer/questionnaire/${clientId}`, {
        headers: {
                Authorization: "Bearer " + getToken(),
            },
        }
    );

    return res.json();
};