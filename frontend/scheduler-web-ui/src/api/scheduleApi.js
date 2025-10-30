import http from "./http";

export function getAll() {
    return http.get("/api/schedule/all").then(r => r.data);
}

export function createBlock(dto) {
    return http.post("/api/schedule/block", dto).then(r => r.data);
}

export function deleteBlock(id) {
    return http.delete(`/api/schedule/block/${id}`).then(r => r.data);
}
