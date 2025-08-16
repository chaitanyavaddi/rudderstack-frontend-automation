import { ApiClient, ApiResponse } from "../RudderStackApiClient";

export class IdentifyEventApiSteps {
    private apiClient: ApiClient;

    constructor(dataPlaneUrl: string, writeKey: string) {
        this.apiClient = new ApiClient(dataPlaneUrl, writeKey);
    }

    async sendIdentifyEvent(payload: any): Promise<ApiResponse> {
        throw new Error('Identify API steps not implemented yet');
    }
}