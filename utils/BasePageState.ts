export abstract class BasePageState {
    
    // Generic method to set any property
    set<T extends keyof this>(key: T, value: string): void {
        (this as any)[key] = value;
    }
    
    // Generic method to get any property
    get<T extends keyof this>(key: T): string | null {
        return (this as any)[key] || null;
    }
    
    // Check if a value exists and is not null
    has<T extends keyof this>(key: T): boolean {
        return (this as any)[key] !== null && (this as any)[key] !== undefined;
    }
    
    // Get all state as an object
    getAll(): Record<string, any> {
        const state: Record<string, any> = {};
        const keys = Object.getOwnPropertyNames(this);
        
        keys.forEach(key => {
            if (key !== 'constructor') {
                state[key] = (this as any)[key];
            }
        });
        
        return state;
    }
    
    // Abstract method that each page state must implement for reset
    abstract reset(): void;
    
    // Generic method to set multiple values at once
    setMultiple(values: Partial<Record<keyof this, string>>): void {
        Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined) {
                this.set(key as keyof this, value);
            }
        });
    }
    
    // Convert state to JSON string
    toJSON(): string {
        return JSON.stringify(this.getAll(), null, 2);
    }
    
    // Load state from object
    fromObject(obj: Record<string, any>): void {
        Object.entries(obj).forEach(([key, value]) => {
            if (value !== undefined && this.hasOwnProperty(key)) {
                this.set(key as keyof this, value);
            }
        });
    }
}