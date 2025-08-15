// ===== TYPES =====

export interface EventsMetrics {
    delivered: number;
    failed: number;
    failureRate: string;
}

// ===== DESTINATION DETAILS STATE CLASS WITH HIERARCHY =====

export class DestinationDetailsPageState {
    
    // Events Tab state - fully implemented
    readonly EventsTab = {
        metrics: {
            delivered: 0,
            failed: 0,
            failureRate: '0%'
        } as EventsMetrics,
        
        // State methods
        setMetrics: (metrics: EventsMetrics) => {
            this.EventsTab.metrics = metrics;
        },
        
        getDeliveredCount: (): number => {
            return this.EventsTab.metrics.delivered;
        },
        
        getFailedCount: (): number => {
            return this.EventsTab.metrics.failed;
        },
        
        getFailureRate: (): string => {
            return this.EventsTab.metrics.failureRate;
        },
        
        reset: () => {
            this.EventsTab.metrics = {
                delivered: 0,
                failed: 0,
                failureRate: '0%'
            };
        }
    };

    // Sources Tab state - TODO
    readonly SourcesTab = {
        data: {
            // TODO
        },
        
        // State methods
        reset: () => {
            // Reset TODO
        }
    };

    // Transformation Tab state - TODO
    readonly TransformationTab = {
        data: {
            // TODO
        },
        
        // State methods
        reset: () => {
            // Reset TODO
        }
    };

    // ===== GLOBAL STATE METHODS =====
    
    reset(): void {
        this.EventsTab.reset();
        this.SourcesTab.reset();
        this.TransformationTab.reset();
    }
    
    getStateSnapshot(): any {
        return {
            eventsTab: { ...this.EventsTab.metrics }
        };
    }
}