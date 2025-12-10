import api from "./api";

const invoiceRunsApi = {
  list: () => api.get("/api/invoice-runs"),
};

export default invoiceRunsApi;
