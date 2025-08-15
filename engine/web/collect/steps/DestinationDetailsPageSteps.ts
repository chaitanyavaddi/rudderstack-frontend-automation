import { Page, BrowserContext, expect } from '@playwright/test';
import { IDestinationDetailsPageSteps, IDestinationDetailsPage, IEventsTabSteps, ISourcesTabSteps, ITransformationTabSteps } from "@collect/core/contracts";
import { DestinationDetailsPage } from "@core/web/collect/pages/DestinationDetailsPage";
import { step } from "@plugins/allureMod";

export class DestinationDetailsPageSteps implements IDestinationDetailsPageSteps {
    private page: Page;
    private context: BrowserContext;
    private destinationDetailsPage: IDestinationDetailsPage;

    // Tab step instances - inner classes
    readonly EventsTab: IEventsTabSteps;
    readonly SourcesTab: ISourcesTabSteps;
    readonly TransformationTab: ITransformationTabSteps;

    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context });
        this.destinationDetailsPage = new DestinationDetailsPage(this.page, this.context);

        // Initialize inner tab step classes
        this.EventsTab = new this.EventsTabStepsImpl(this);
        this.SourcesTab = new this.SourcesTabStepsImpl(this);
        this.TransformationTab = new this.TransformationTabStepsImpl(this);
    }

    // ===== NAVIGATION =====

    async navigate(destinationId: string): Promise<void> {
        await step(`COLLECT: Navigate to Destination Details - ${destinationId}`, async () => {
            await this.destinationDetailsPage.navigate(destinationId);
        });
    }

    // ===== MAIN PAGE ACTIONS =====

    async toggleDestinationSync(): Promise<void> {
        await step("COLLECT: Toggle Destination Sync", async () => {
            await this.destinationDetailsPage.clickToggleSyncSwitch();
        });
    }

    async editDestination(): Promise<void> {
        await step("COLLECT: Edit Destination", async () => {
            await this.destinationDetailsPage.clickBtnEditDestination();
        });
    }

    // ===== INNER TAB STEP CLASSES =====

    private EventsTabStepsImpl = class implements IEventsTabSteps {
        constructor(private outer: DestinationDetailsPageSteps) {}

        async navigate(): Promise<void> {
            await step("COLLECT: Navigate to Events Tab", async () => {
                await this.outer.destinationDetailsPage.clickTabEvents();
            });
        }

        async refresh(): Promise<void> {
            await step("COLLECT: Refresh Events", async () => {
                await this.outer.destinationDetailsPage.EventsTab.clickRefresh();
            });
        }

        async filterBySource(source: string): Promise<void> {
            await step(`COLLECT: Filter Events by Source - ${source}`, async () => {
                await this.outer.destinationDetailsPage.EventsTab.selectSourceFilter(source);
            });
        }

        async filterByTimeRange(timeRange: string): Promise<void> {
            await step(`COLLECT: Filter Events by Time Range - ${timeRange}`, async () => {
                await this.outer.destinationDetailsPage.EventsTab.selectTimeFilter(timeRange);
            });
        }

        async validateMetrics(expectedDelivered: number, expectedFailed: number, expectedRate: string): Promise<void> {
            await step(`COLLECT: Validate Events Metrics - Delivered: ${expectedDelivered}, Failed: ${expectedFailed}, Rate: ${expectedRate}`, async () => {
                await this.outer.destinationDetailsPage.EventsTab.stateLoadMetrics();
                
                const delivered = this.outer.destinationDetailsPage.state.EventsTab.getDeliveredCount();
                const failed = this.outer.destinationDetailsPage.state.EventsTab.getFailedCount();
                const rate = this.outer.destinationDetailsPage.state.EventsTab.getFailureRate();
                
                expect(delivered).toBe(expectedDelivered);
                expect(failed).toBe(expectedFailed);
                expect(rate).toBe(expectedRate);
            });
        }

        async validateTableIsVisible(): Promise<void> {
            await step("COLLECT: Validate Events Table is Visible", async () => {
                await expect(this.outer.destinationDetailsPage.EventsTab.tblEventDetails).toBeVisible();
            });
        }

        async switchToFailuresOnly(): Promise<void> {
            await step("COLLECT: Switch to Failures Only View", async () => {
                await this.outer.destinationDetailsPage.EventsTab.clickSegmentFailures();
            });
        }

        async switchToAllEvents(): Promise<void> {
            await step("COLLECT: Switch to All Events View", async () => {
                await this.outer.destinationDetailsPage.EventsTab.clickSegmentAll();
            });
        }

        async completeValidationWorkflow(): Promise<void> {
            await step("COLLECT: Complete Events Tab Validation Workflow", async () => {
                await this.navigate();
                await this.validateMetrics(0, 0, '0%');
                await this.refresh();
                await this.validateTableIsVisible();
            });
        }

        async testFiltering(): Promise<void> {
            await step("COLLECT: Test Event Filtering Workflow", async () => {
                await this.navigate();
                await this.filterByTimeRange('Past 7 days');
                await this.filterBySource('All sources');
                await this.validateTableIsVisible();
            });
        }
    };

    private SourcesTabStepsImpl = class implements ISourcesTabSteps {
        constructor(private outer: DestinationDetailsPageSteps) {}

        async navigate(): Promise<void> {
            await step("COLLECT: Navigate to Sources Tab", async () => {
                await this.outer.destinationDetailsPage.clickTabSources();
            });
        }
    };

    private TransformationTabStepsImpl = class implements ITransformationTabSteps {
        constructor(private outer: DestinationDetailsPageSteps) {}

        async navigate(): Promise<void> {
            await step("COLLECT: Navigate to Transformation Tab", async () => {
                await this.outer.destinationDetailsPage.clickTabTransformation();
            });
        }
    };
}