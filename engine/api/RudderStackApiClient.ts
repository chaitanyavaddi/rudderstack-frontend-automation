import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { step } from '@plugins/allureMod';
import { testConfig } from 'config/testConfig';
import { allure } from 'allure-playwright';

export interface ApiResponse {
    status: number;
    data: any;
    headers: Record<string, string>;
    responseTime: number;
}

export class ApiClient {
    private client: AxiosInstance;

    constructor(private baseUrl: string, private writeKey: string) {
        const encodedWriteKey = Buffer.from(writeKey + ':').toString('base64');
        this.client = axios.create({
            baseURL: baseUrl,
            timeout: testConfig.timeouts.action,
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Basic ${encodedWriteKey}`
            }
        });
    }

    async makeRequest(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        endpoint: string,
        data?: any,
        params?: any
    ): Promise<ApiResponse> {
        const requestUrl = `${this.baseUrl}${endpoint}`;
        const startTime = Date.now();
        
        // Attach request to Allure
        await allure.attachment('Request', JSON.stringify({
            method,
            url: requestUrl,
            headers: this.client.defaults.headers,
            body: data,
            queryParams: params
        }, null, 2), { contentType: 'application/json' });

        try {
            const response: AxiosResponse = await this.client.request({
                method,
                url: endpoint,
                data,
                params
            });

            const responseTime = Date.now() - startTime;

            const apiResponse: ApiResponse = {
                status: response.status,
                data: response.data,
                headers: this.extractHeaders(response.headers),
                responseTime
            };

            // Attach response to Allure - SUCCESS OR ERROR
            await allure.attachment('Response', JSON.stringify({
                status: response.status,
                headers: apiResponse.headers,
                body: response.data,
                responseTime: `${responseTime}ms`
            }, null, 2), { contentType: 'application/json' });

            return apiResponse;

        } catch (error) {
            if (error.response) {
                // HTTP error - still return response
                const responseTime = Date.now() - startTime;
                
                const apiResponse: ApiResponse = {
                    status: error.response.status,
                    data: error.response.data,
                    headers: this.extractHeaders(error.response.headers),
                    responseTime
                };

                // Attach response to Allure - SAME AS SUCCESS
                await allure.attachment('Response', JSON.stringify({
                    status: error.response.status,
                    headers: apiResponse.headers,
                    body: error.response.data,
                    responseTime: `${responseTime}ms`
                }, null, 2), { contentType: 'application/json' });

                return apiResponse;
            }

            // Network error - re-throw
            throw error;
        }
    }

    private extractHeaders(headers: any): Record<string, string> {
        const headerObj: Record<string, string> = {};
        Object.entries(headers).forEach(([key, value]) => {
            headerObj[key] = String(value);
        });
        return headerObj;
    }
}
