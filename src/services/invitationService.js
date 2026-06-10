const API = "http://127.0.0.1:5000";

const getToken = () => localStorage.getItem("token");

export const sendInvite = async (email) => {

    const res = await fetch(`${API}/invites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken(),
        },
        body: JSON.stringify({ email }),
    });

    return res.json()
};

export const validateInviteToken = async (token) => {

    const res = await fetch(`${API}/invites/${token}`);

    if (!res.ok) {
        throw new Error("Invalid invitation");
    }
    return res.json();
};

export const acceptInvite = async (token, firstName, lastName, password) => {
    const res = await fetch(`${API}/accept-invite`, {
        method: "POST",
        headers: {"Content-Type": "application/json",
        },
        body: JSON.stringify({ token, first_name: firstName, last_name: lastName, password})
    });
    return res.json()
};

export const revokeInvitation = async(inviteId) => {
    const res = await fetch(`${API}/invites/${inviteId}/revoke`, {
        method: "PATCH",
        headers: {
            Authorization: "Bearer " + getToken(),
        },
    });

    return res.json();
};

export const getInvites = async() => {
    const res = await fetch(`${API}/invites`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + getToken(),
        },
    });
    return res.json();
}

export const revokeInvite = async (inviteId) => {

  const res = await fetch(`${API}/invites/${inviteId}/revoke`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

  return res.json();

};
