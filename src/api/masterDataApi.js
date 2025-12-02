import api from "./api";
const masterDataApi = {
  listDepartments: () => api.get("/api/department"),
  listHospitalityTypes: () => api.get("/api/hospitality-type"),
  listCounterParties: () => api.get("/api/counterparty"),
  listPositions: () => api.get("/api/position"),
};

export default masterDataApi;
