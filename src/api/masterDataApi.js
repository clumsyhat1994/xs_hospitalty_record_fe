import api from "./api";
const masterDataApi = {
  listDepartments: () => api.get("/api/department"),
  listHospitalityTypes: () => api.get("/api/hospitality-type"),
  listCounterParties: () => api.get("/api/counterparty"),
  searchCounterParties: (keyword) =>
    api.get("/api/counterparty/search", {
      params: { q: keyword },
    }),
  listPositions: () => api.get("/api/position"),
};

export default masterDataApi;
