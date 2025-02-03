export const API_URL = "http://localhost:3000/api";

export const getUserProfile =async (token:string) => {
    const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`, // Attach JWT token
        }
    });
    
    if(!response.ok) {
        throw new Error("Failde to fetch user profile");
    }

    return response.json();
}