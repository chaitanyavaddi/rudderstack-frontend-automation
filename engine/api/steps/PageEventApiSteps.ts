import { ApiClient, ApiResponse } from "../RudderStackApiClient";

export class PageEventApiSteps {
    private apiClient: ApiClient;

    constructor(dataPlaneUrl: string, writeKey: string) {
        this.apiClient = new ApiClient(dataPlaneUrl, writeKey);
    }

    async sendPageEvent(payload: any): Promise<ApiResponse> {
        throw new Error('Page API steps not implemented yet');
    }
}