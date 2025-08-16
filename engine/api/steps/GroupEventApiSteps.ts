import { ApiClient, ApiResponse } from "../RudderStackApiClient";

export class GroupEventApiSteps {
    private apiClient: ApiClient;

    constructor(dataPlaneUrl: string, writeKey: string) {
        this.apiClient = new ApiClient(dataPlaneUrl, writeKey);
    }

    async sendGroupEvent(payload: any): Promise<ApiResponse> {
        throw new Error('Group API steps not implemented yet');
    }
}