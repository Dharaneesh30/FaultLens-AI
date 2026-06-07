import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
});

export async function checkBackendHealth() {
  const response = await apiClient.get("/health");
  return response.data;
}

export async function classifyRequirement(requirementText) {
  const response = await apiClient.post("/classify", {
    requirement_text: requirementText,
  });
  return response.data;
}

export async function detectRequirementConflict(requirementA, requirementB) {
  const response = await apiClient.post("/conflicts", {
    requirement_a: requirementA,
    requirement_b: requirementB,
  });
  return response.data;
}

export default apiClient;
