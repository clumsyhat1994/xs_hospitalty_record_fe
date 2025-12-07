import api from "./api";
import { getEndpoint } from "../config/runtimeConfig";

function getHospitalityPath() {
  // runtime-config override, with a sane default
  return getEndpoint("HOSPITALITY");
}

const hospitalityApi = {
  get: (id) => api.get(`${getHospitalityPath()}/${id}`),
  filtered_list: (page = 0, size = 10) =>
    api.get(getHospitalityPath(), { params: { page, size } }),
  create: (payload, confirm = false) =>
    api.post(getHospitalityPath(), payload, {
      params: confirm ? { confirm: true } : {},
    }),
  update: (id, payload, confirm = false) => {
    console.log("api.update confirm =", confirm);
    return api.put(`${getHospitalityPath()}/${id}`, payload, {
      params: confirm === true ? { confirm: true } : {},
    });
  },
  deleteOne: (id) => api.delete(`${getHospitalityPath()}/${id}`),
  batchDelete: (ids) =>
    api.delete(`${getHospitalityPath()}/batch`, { params: { ids } }),
};

export default hospitalityApi;
