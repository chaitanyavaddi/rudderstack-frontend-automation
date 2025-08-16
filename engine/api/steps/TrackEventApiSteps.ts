import { expect } from '@playwright/test';
import { step } from '@plugins/allureMod';
import { testConfig } from 'config/testConfig';
import { allure } from 'allure-playwright';
import { ApiClient, ApiResponse } from '../RudderStackApiClient';

export interface TrackPayload {
    userId: string;
    event: string;
    properties?: any;
    context?: any;
    timestamp?: string;
}

export class TrackEventApiSteps {
    private apiClient: ApiClient;

    constructor(dataPlaneUrl: string, writeKey: string) {
        this.apiClient = new ApiClient(dataPlaneUrl, writeKey);
    }

    async sendTrackEvent(payload: TrackPayload): Promise<ApiResponse> {
        let response: ApiResponse;
        
        await step(`Send Track Event: ${payload.event}`, async () => {
            const endpoint = `/${testConfig.apiVersion}/track`;
            
            const data = {
                timestamp: new Date().toISOString(),
                ...payload
            };

            response = await this.apiClient.makeRequest('POST', endpoint, data);
        });
        
        return response!;
    }

    async sendTrackEventAndVerify(payload: TrackPayload, expectedStatus: number = 200): Promise<ApiResponse> {
        let response: ApiResponse;
        
        await step(`Send & Verify Track Event: ${payload.event}`, async () => {
            response = await this.sendTrackEvent(payload);
            
            allure.parameter('userId', payload.userId);
            allure.parameter('event', payload.event);
            allure.parameter('expectedStatus', expectedStatus.toString());
            allure.parameter('actualStatus', response.status.toString());
            allure.parameter('responseTime', `${response.responseTime}ms`);
            
            expect(response.status).toBe(expectedStatus);
            expect(response.responseTime).toBeLessThan(testConfig.timeouts.action);
            
            if (expectedStatus === 200) {
                expect(response.data).toBeTruthy();
            }
        });
        
        return response!;
    }

    async sendCurlExampleTrackEvent(): Promise<ApiResponse> {
        const payload: TrackPayload = {
            userId: "user123",
            event: "Product Purchased",
            properties: {
                name: "Rubik's Cube",
                revenue: 4.99
            },
            context: {
                ip: "14.5.67.21"
            },
            timestamp: "2020-02-02T00:23:09.544Z"
        };
        return this.sendTrackEventAndVerify(payload);
    }

}
