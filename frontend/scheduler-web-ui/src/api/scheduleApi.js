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

//export function createBlock(dto) {
//    return http.post("/api/schedule/block", dto).then(r => r.data);
//}

//export function deleteBlock(id) {
//    return http.delete(`/api/schedule/block/${id}`).then(r => r.data);
//}
