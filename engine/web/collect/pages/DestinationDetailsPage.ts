import { IDestinationDetailsPage, IEventsTab, ISourcesTab, ITransformationTab } from "@collect/core/contracts";
import { Page, BrowserContext, Locator } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { LocatorTypes as lt } from "utils/Enums";
import { step } from "@plugins/allureMod";
import { DestinationDetailsPageState } from "@core/web/collect/states/DestinationDetailsPageState";

let webActions: WebActions;

export class DestinationDetailsPage implements IDestinationDetailsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly state: DestinationDetailsPageState;

    // Header elements
    readonly lnkAllDestinations: Locator;
    readonly btnEditDestination: Locator;
    readonly btnCopyDestination: Locator;
    readonly toggleSyncSwitch: Locator;
    readonly btnLiveEvents: Locator;
    
    // Tab navigation
    readonly tabSources: Locator;
    readonly tabTransformation: Locator;
    readonly tabEvents: Locator;
    readonly tabConfiguration: Locator;
    readonly tabSettings: Locator;
    
    // Tab instances - inner classes
    readonly EventsTab: IEventsTab;
    readonly SourcesTab: ISourcesTab;
    readonly TransformationTab: ITransformationTab;

    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context });
        webActions = new WebActions(this.page, this.context);
        this.state = new DestinationDetailsPageState();

        // Header elements
        this.lnkAllDestinations = page.locator('a').filter({ hasText: 'All destinations' });
        this.btnEditDestination = page.locator('button[data-testid="edit-button"]');
        this.btnCopyDestination = page.locator('button[data-testid="copy-button"]');
        this.toggleSyncSwitch = page.locator('button[data-testid="syncToggleSwitch"]');
        this.btnLiveEvents = page.locator('button').filter({ hasText: 'Live events' });
        
        // Tab navigation
        this.tabSources = page.locator('[role="tab"][aria-controls*="Sources"]');
        this.tabTransformation = page.locator('[role="tab"][aria-controls*="Transformation"]');
        this.tabEvents = page.locator('[role="tab"][aria-controls*="Events"]');
        this.tabConfiguration = page.locator('[role="tab"][aria-controls*="Configuration"]');
        this.tabSettings = page.locator('[role="tab"][aria-controls*="Settings"]');

        // Initialize inner tab classes
        this.EventsTab = new this.EventsTabImpl(this);
        this.SourcesTab = new this.SourcesTabImpl(this);
        this.TransformationTab = new this.TransformationTabImpl(this);
    }

    // ===== NAVIGATION =====

    async navigate(destinationId: string): Promise<void> {
        await step(`Navigate to destination details: ${destinationId}`, async () => {
            await webActions.goto(`/destinations/${destinationId}`);
        });
    }

    // ===== TAB NAVIGATION =====

    async clickTabEvents(): Promise<void> {
        await step("Click Events tab", async () => {
            await webActions.click(this.tabEvents, `Events ${lt.TAB}`);
        });
    }

    async clickTabSources(): Promise<void> {
        await step("Click Sources tab", async () => {
            await webActions.click(this.tabSources, `Sources ${lt.TAB}`);
        });
    }

    async clickTabTransformation(): Promise<void> {
        await step("Click Transformation tab", async () => {
            await webActions.click(this.tabTransformation, `Transformation ${lt.TAB}`);
        });
    }

    // ===== HEADER ACTIONS =====

    async clickBtnEditDestination(): Promise<void> {
        await step("Click edit destination button", async () => {
            await webActions.click(this.btnEditDestination, `Edit Destination ${lt.BTN}`);
        });
    }

    async clickToggleSyncSwitch(): Promise<void> {
        await step("Toggle sync switch", async () => {
            await webActions.click(this.toggleSyncSwitch, `Sync Toggle ${lt.SWT}`);
        });
    }

    // ===== INNER TAB CLASSES =====

    private EventsTabImpl = class implements IEventsTab {
        readonly btnRefresh: Locator;
        readonly ddlSourceFilter: Locator;
        readonly ddlTimeFilter: Locator;
        readonly lblDeliveredCount: Locator;
        readonly lblFailedCount: Locator;
        readonly lblFailureRate: Locator;
        readonly canChart: Locator;
        readonly tblEventDetails: Locator;
        readonly segControl: Locator;

        constructor(private outer: DestinationDetailsPage) {
            // Initialize locators using outer class reference
            this.btnRefresh = outer.page.locator('button').filter({ hasText: 'Refresh' });
            this.ddlSourceFilter = outer.page.locator('.events_source_filter__EJQ4k .ant-select');
            this.ddlTimeFilter = outer.page.locator('.events_time_filter__JTNKY .ant-select');
            this.lblDeliveredCount = outer.page.locator('text=Delivered').locator('..').locator('h2 span');
            this.lblFailedCount = outer.page.locator('text=Failed').locator('..').locator('h2 span');
            this.lblFailureRate = outer.page.locator('text=Failure rate').locator('..').locator('h2');
            this.canChart = outer.page.locator('canvas[data-testid="canvas"]');
            this.tblEventDetails = outer.page.locator('.ant-table-tbody');
            this.segControl = outer.page.locator('.ant-segmented');
        }

        async clickRefresh(): Promise<void> {
            await step("Click events refresh button", async () => {
                await webActions.click(this.btnRefresh, `Events Refresh ${lt.BTN}`);
            });
        }

        async selectSourceFilter(source: string): Promise<void> {
            await step(`Select events source filter: ${source}`, async () => {
                await webActions.click(this.ddlSourceFilter, `Events Source ${lt.DRI}`);
                await webActions.click(this.outer.page.locator(`text="${source}"`), `Source Filter: ${source}`);
            });
        }

        async selectTimeFilter(timeRange: string): Promise<void> {
            await step(`Select events time filter: ${timeRange}`, async () => {
                await webActions.click(this.ddlTimeFilter, `Events Time ${lt.DRI}`);
                await webActions.click(this.outer.page.locator(`text="${timeRange}"`), `Time Filter: ${timeRange}`);
            });
        }

        async clickSegmentAll(): Promise<void> {
            await step("Click events segment - All", async () => {
                await webActions.click(this.segControl.locator('text=All'), "Events Segment: All");
            });
        }

        async clickSegmentFailures(): Promise<void> {
            await step("Click events segment - Failures", async () => {
                await webActions.click(this.segControl.locator('text=Failures'), "Events Segment: Failures");
            });
        }

        async stateLoadMetrics(): Promise<void> {
            await step("Load events metrics to state", async () => {
                const deliveredText = await this.lblDeliveredCount.textContent() || '0';
                const failedText = await this.lblFailedCount.textContent() || '0';
                const failureRate = await this.lblFailureRate.textContent() || '0%';
                
                this.outer.state.EventsTab.setMetrics({
                    delivered: parseInt(deliveredText.trim()),
                    failed: parseInt(failedText.trim()),
                    failureRate: failureRate.trim()
                });
            });
        }
    };

    private SourcesTabImpl = class implements ISourcesTab {
        readonly btnAddSource: Locator;
        readonly tblSourcesList: Locator;

        constructor(private outer: DestinationDetailsPage) {
            this.btnAddSource = outer.page.locator('button').filter({ hasText: 'Add source' });
            this.tblSourcesList = outer.page.locator('.sources-table');
        }

        async clickAddSource(): Promise<void> {
            throw new Error("SourcesTab.clickAddSource() - Not implemented");
        }
    };

    private TransformationTabImpl = class implements ITransformationTab {
        readonly btnAddTransformation: Locator;

        constructor(private outer: DestinationDetailsPage) {
            this.btnAddTransformation = outer.page.locator('button').filter({ hasText: 'Add transformation' });
        }

        async clickAddTransformation(): Promise<void> {
            throw new Error("TransformationTab.clickAddTransformation() - Not implemented");
        }
    };
}