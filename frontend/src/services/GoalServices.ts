import { makeRequest, method } from "./ServiceConfig";

const GoalServices = {
    async getGoals() {
        return await makeRequest(`/api/goals`, method.GET);
    },
    async createGoal(req: { text: string }) {
        return await makeRequest(`/api/goals`, method.POST, req);
    },
    async updateGoal(req: { text: string, _id: string }) {
        return await makeRequest(`/api/goals/${req?._id}`, method.PUT, req);
    },
    async deleteGoal(req: { _id: string }) {
        return await makeRequest(`/api/goals/${req?._id}`, method.DELETE, req);
    },
}

export default GoalServices