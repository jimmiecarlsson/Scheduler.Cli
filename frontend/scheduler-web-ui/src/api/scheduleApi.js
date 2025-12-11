import http from "./http";

export async function getAll() {
    return http.get("/api/schedule/all").then(r => r.data);
}
export async function getToday() {
    return http.get("/api/schedule/today").then(r => r.data);
}
export async function getById(id) {
    return http.get(`/api/schedule/${id}`).then(r => r.data);
}

export async function createBlock(dto) {
    const response = await http.post("/api/schedule/block", dto);
    return response.data;
}

export async function deleteBlock(id) {
    const response = await http.delete(`/api/schedule/block/${id}`);
    return response.data;
}

export async function updateBlock(id, dto) {
    const res = await http.put(`/api/schedule/block/${id}`, dto);
    return res.data;
}

export async function login(email, password) {
    return http.post("/login", { email, password });
}

export async function logout() {
    return http.post("/api/Schedule/logout");
}

export async function getMyContributor() {
    const res = await http.get("/api/schedule/contributors/me");
    return res.data;
}

export async function getUsers() {
    return http.get("/api/schedule/users").then(r => r.data);
}

export async function makeContributor(userId) {
    return http.post(`/api/schedule/users/${userId}/make-contributor`);
}
