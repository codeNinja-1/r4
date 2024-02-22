export abstract class IndexedRegistryItem {
    private registeredId: number;
    private registeredName: string;

    bindRegistryKeys(id: number, name: string) {
        this.registeredId = id;
        this.registeredName = name;
    }
    
    getRegisteredId() {
        return this.registeredId;
    }

    getRegisteredName() {
        return this.registeredName;
    }
}