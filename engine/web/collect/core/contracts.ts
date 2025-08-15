import { Page, Locator, BrowserContext } from '@playwright/test';
import { SourceTypes, DestinationTypes } from "utils/Enums";
import { ConnectionsPageState } from "@collect/states/ConnectionPageState";
import { DestinationDetailsPageState } from "@core/web/collect/states/DestinationDetailsPageState";

export interface IConnectionsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly state: ConnectionsPageState;
    
    // Locators
    readonly lblDataPlaneUrl: Locator;
    readonly btnDataPlaneCopy: Locator;
    readonly allSourceCards: Locator;
    readonly allDestinationCards: Locator;
    
    // Navigation
    navigate(url: string): Promise<void>;
    
    // State Loading Methods
    stateLoadDataPlaneUrl(): Promise<void>;
    stateLoadSourceCard(name?: string, type?: SourceTypes | string, status?: string, index?: number): Promise<void>;
    stateLoadDestinationCard(name?: string, type?: DestinationTypes | string, status?: string, index?: number): Promise<void>;
    
    // Action Methods
    copyDataPlaneUrl(): Promise<void>;
    clickSourceCard(name?: string, type?: SourceTypes | string, status?: string, index?: number): Promise<void>;
    clickDestinationCard(name?: string, type?: DestinationTypes | string, status?: string, index?: number): Promise<void>;
}

export interface IConnectionsPageSteps {
    navigate(url: string): Promise<void>;
    getState(): ConnectionsPageState;

    // State Loading Methods
    loadDataPlaneUrl(): Promise<void>;
    loadSourceCard(name?: string, type?: SourceTypes | string, status?: string, index?: number): Promise<void>;
    loadDestinationCard(name?: string, type?: DestinationTypes | string, status?: string, index?: number): Promise<void>;
    
    // Action Methods
    clickSourceCard(name?: string, type?: SourceTypes | string, status?: string, index?: number): Promise<void>;
    clickDestinationCard(name?: string, type?: DestinationTypes | string, status?: string, index?: number): Promise<void>;
    loadAndClickSourceCard(name?: string, type?: SourceTypes | string, status?: string, index?: number): Promise<void>;
    loadAndClickDestinationCard(name?: string, type?: DestinationTypes | string, status?: string, index?: number): Promise<void>;
    verifySourceCard(): Promise<void>;
    verifyDestinationCard(): Promise<void>;
}

// ===== MAIN DESTINATIONS LIST PAGE =====

// Tab interfaces - these define the structure for inner classes
export interface IEventsTab {
    readonly btnRefresh: Locator;
    readonly ddlSourceFilter: Locator;
    readonly ddlTimeFilter: Locator;
    readonly lblDeliveredCount: Locator;
    readonly lblFailedCount: Locator;
    readonly lblFailureRate: Locator;
    readonly canChart: Locator;
    readonly tblEventDetails: Locator;
    readonly segControl: Locator;
    
    clickRefresh(): Promise<void>;
    selectSourceFilter(source: string): Promise<void>;
    selectTimeFilter(timeRange: string): Promise<void>;
    clickSegmentAll(): Promise<void>;
    clickSegmentFailures(): Promise<void>;
    stateLoadMetrics(): Promise<void>;
}

export interface ISourcesTab {
    readonly btnAddSource: Locator;
    readonly tblSourcesList: Locator;
    clickAddSource(): Promise<void>;
}

export interface ITransformationTab {
    readonly btnAddTransformation: Locator;
    clickAddTransformation(): Promise<void>;
}

// Main page interface - references inner tab classes
export interface IDestinationDetailsPage {
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
    
    // Tab instances - inner classes accessible as properties
    readonly EventsTab: IEventsTab;
    readonly SourcesTab: ISourcesTab;
    readonly TransformationTab: ITransformationTab;
    
    // Navigation
    navigate(destinationId: string): Promise<void>;
    
    // Tab navigation
    clickTabEvents(): Promise<void>;
    clickTabSources(): Promise<void>;
    clickTabTransformation(): Promise<void>;
    
    // Header actions
    clickBtnEditDestination(): Promise<void>;
    clickToggleSyncSwitch(): Promise<void>;
}

// Step tab interfaces - define structure for inner step classes
export interface IEventsTabSteps {
    navigate(): Promise<void>;
    refresh(): Promise<void>;
    filterBySource(source: string): Promise<void>;
    filterByTimeRange(timeRange: string): Promise<void>;
    validateMetrics(expectedDelivered: number, expectedFailed: number, expectedRate: string): Promise<void>;
    validateTableIsVisible(): Promise<void>;
    switchToFailuresOnly(): Promise<void>;
    switchToAllEvents(): Promise<void>;
    completeValidationWorkflow(): Promise<void>;
    testFiltering(): Promise<void>;
}

export interface ISourcesTabSteps {
    navigate(): Promise<void>;
}

export interface ITransformationTabSteps {
    navigate(): Promise<void>;
}

// Main steps interface - references inner step tab classes
export interface IDestinationDetailsPageSteps {
    navigate(destinationId: string): Promise<void>;
    
    // Tab-specific step hierarchies - inner classes accessible as properties
    readonly EventsTab: IEventsTabSteps;
    readonly SourcesTab: ISourcesTabSteps;
    readonly TransformationTab: ITransformationTabSteps;
    
    // Main page actions
    toggleDestinationSync(): Promise<void>;
    editDestination(): Promise<void>;
}