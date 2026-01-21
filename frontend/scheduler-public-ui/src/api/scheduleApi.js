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
export async function getCurrentSong() {
    const res = await http.get("/api/playlist/current");
    return res.status === 204 ? null : res.data;
}
