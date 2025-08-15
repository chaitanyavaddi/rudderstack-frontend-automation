import { IConnectionsPage } from "@collect/core/contracts";
import { Page, BrowserContext, Locator } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { DestinationTypes, LocatorTypes as lt, SourceTypes } from "utils/Enums";
import { step } from "@plugins/allureMod";
import { ConnectionsPageState } from "@collect/states/ConnectionPageState";

let webActions: WebActions;

export class ConnectionsPage implements IConnectionsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly state: ConnectionsPageState;

    readonly lblDataPlaneUrl: Locator;
    readonly btnDataPlaneCopy: Locator;
    readonly allSourceCards: Locator;
    readonly allDestinationCards: Locator;

    constructor(page: Page, context: BrowserContext) {
        Object.assign(this, { page, context });
        webActions = new WebActions(this.page, this.context);
        this.state = new ConnectionsPageState();

        this.lblDataPlaneUrl = page.locator('span.text-ellipsis').filter({ hasText: 'https://' });
        this.btnDataPlaneCopy = page.locator('button.dataplane-url-copy-cta');
        this.allSourceCards = page.locator('#sources-list div[id^="source-"]');
        this.allDestinationCards = page.locator('#destinations-list div[id^="destination-"]');
    }

    async navigate(url: string): Promise<void> {
        await step("Navigate to connections page", async () => {
            await webActions.goto(url);
        });
    }

    async stateLoadDataPlaneUrl(): Promise<void> {
        await step("Load data plane URL to state", async () => {
            const dataPlaneUrl = await this.lblDataPlaneUrl.textContent();
            if (dataPlaneUrl) {
                this.state.setDataPlaneUrl(dataPlaneUrl.trim());
            }
        });
    }

    async copyDataPlaneUrl(): Promise<void> {
        await step("Copy data plane URL", async () => {
            await webActions.click(this.btnDataPlaneCopy, "Data Plane URL Copy Button");
        });
    }

    private async findSourceCard(name?: string, type?: SourceTypes | string, status?: string, index?: number): Promise<Locator> {
        let sourceCard = this.allSourceCards;

        // Filter by name if provided
        if (name) {
            sourceCard = sourceCard.filter({ has: this.page.locator('.sc-ipMuEU', { hasText: name }) });
        }

        // Filter by type if provided  
        if (type) {
            sourceCard = sourceCard.filter({ has: this.page.locator('.sc-jrkPvW', { hasText: type }) });
        }

        // Filter by status if provided
        if (status) {
            sourceCard = sourceCard.filter({ has: this.page.locator('.sc-kDnyiN.jcnYWX', { hasText: status }) });
        }

        return index !== undefined ? sourceCard.nth(index) : sourceCard.first();
    }

    private async findDestinationCard(name?: string, type?: DestinationTypes | string, status?: string, index?: number): Promise<Locator> {
        let destinationCard = this.allDestinationCards;

        // Filter by name if provided
        if (name) {
            destinationCard = destinationCard.filter({ has: this.page.locator('.sc-ipMuEU', { hasText: name }) });
        }

        // Filter by type if provided
        if (type) {
            destinationCard = destinationCard.filter({ has: this.page.locator('.sc-jrkPvW', { hasText: type }) });
        }

        // Filter by status if provided
        if (status) {
            destinationCard = destinationCard.filter({ has: this.page.locator('.sc-kDnyiN.jcnYWX', { hasText: status }) });
        }

        return index !== undefined ? destinationCard.nth(index) : destinationCard.first();
    }

    // ATOMIC ACTIONS - One action per method
    async stateLoadSourceCard(name?: string, type?: SourceTypes | string, status?: string, index?: number): Promise<void> {
        await step(`Load source card to state - Name: ${name || 'Any'}, Type: ${type || 'Any'}, Status: ${status || 'Any'}, Index: ${index ?? 'First'}`, async () => {
            const cardToLoad = await this.findSourceCard(name, type, status, index);

            // Extract card details
            const cardId = await cardToLoad.getAttribute('id') || '';
            const cardName = await cardToLoad.locator('.sc-ipMuEU').textContent() || '';
            const cardType = await cardToLoad.locator('.sc-jrkPvW').textContent() || '';
            const cardStatus = await cardToLoad.locator('.sc-kDnyiN.jcnYWX').textContent() || '';

            // Extract write key from the "Write key" span text
            const writeKeySpan = cardToLoad.locator('span:has-text("Write key")');
            const writeKeyText = await writeKeySpan.textContent() || '';
            const writeKey = writeKeyText.replace('Write key ', '').trim();

            // Store in state
            this.state.setCurrentSourceCard({
                id: cardId.replace('source-', ''),
                name: cardName.trim(),
                type: cardType.trim(),
                status: cardStatus.trim(),
                writeKey: writeKey
            });
        });
    }

    async clickSourceCard(name?: string, type?: SourceTypes | string, status?: string, index?: number): Promise<void> {
        await step(`Click source card - Name: ${name || 'Any'}, Type: ${type || 'Any'}, Status: ${status || 'Any'}, Index: ${index ?? 'First'}`, async () => {
            const cardToClick = await this.findSourceCard(name, type, status, index);
            
            // Get card name for logging
            const cardName = await cardToClick.locator('.sc-ipMuEU').textContent() || 'Unknown';
            
            // Click the card
            await webActions.click(cardToClick, `Source ${lt.CARD} - ${cardName.trim()}`);
        });
    }

    async stateLoadDestinationCard(name?: string, type?: DestinationTypes | string, status?: string, index?: number): Promise<void> {
        await step(`Load destination card to state - Name: ${name || 'Any'}, Type: ${type || 'Any'}, Status: ${status || 'Any'}, Index: ${index ?? 'First'}`, async () => {
            const cardToLoad = await this.findDestinationCard(name, type, status, index);

            // Extract card details
            const cardId = await cardToLoad.getAttribute('id') || '';
            const cardName = await cardToLoad.locator('.sc-ipMuEU').textContent() || '';
            const cardType = await cardToLoad.locator('.sc-jrkPvW').textContent() || '';
            const cardStatus = await cardToLoad.locator('.sc-kDnyiN.jcnYWX').textContent() || '';

            // Store in state
            this.state.setCurrentDestinationCard({
                id: cardId.replace('destination-', ''),
                name: cardName.trim(),
                type: cardType.trim(),
                status: cardStatus.trim()
            });
        });
    }

    async clickDestinationCard(name?: string, type?: DestinationTypes | string, status?: string, index?: number): Promise<void> {
        await step(`Click destination card - Name: ${name || 'Any'}, Type: ${type || 'Any'}, Status: ${status || 'Any'}, Index: ${index ?? 'First'}`, async () => {
            const cardToClick = await this.findDestinationCard(name, type, status, index);
            
            // Get card name for logging
            const cardName = await cardToClick.locator('.sc-ipMuEU').textContent() || 'Unknown';
            
            // Click the card
            await webActions.click(cardToClick, `Destination ${lt.CARD} - ${cardName.trim()}`);
        });
    }
}