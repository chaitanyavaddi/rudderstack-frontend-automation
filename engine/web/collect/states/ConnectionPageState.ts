
import { BasePageState } from "utils/BasePageState";

interface SourceCard {
    id: string;
    name: string;
    status: string;
    writeKey: string;
    type: string;
}

interface DestinationCard {
    id: string;
    name: string;
    status: string;
    type: string;
}

export class ConnectionsPageState extends BasePageState {
    dataPlaneUrl: string | null = null;
    currentSourceCard: SourceCard | null = null;
    currentDestinationCard: DestinationCard | null = null;
    
    getDataPlaneUrl(): string | null {
        return this.dataPlaneUrl;
    }
    
    getCurrentSourceCard(): SourceCard | null {
        return this.currentSourceCard;
    }
    
    getCurrentDestinationCard(): DestinationCard | null {
        return this.currentDestinationCard;
    }
    
    setDataPlaneUrl(url: string): void {
        this.dataPlaneUrl = url;
    }
    
    setCurrentSourceCard(sourceCard: SourceCard): void {
        this.currentSourceCard = sourceCard;
    }
    
    setCurrentDestinationCard(destinationCard: DestinationCard): void {
        this.currentDestinationCard = destinationCard;
    }
    
    reset(): void {
        this.dataPlaneUrl = null;
        this.currentSourceCard = null;
        this.currentDestinationCard = null;
    }
}