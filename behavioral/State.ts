class DocumentItem {
    private state: DocumentItemState;

    constructor(state?: DocumentItemState) {
        state = state || new DraftDocumentItemState();
        this.setState(state);
    }

    public setState(state: DocumentItemState): void {
        console.log(`Document: Set state ${(<any>state).constructor.name}`);
        this.state = state;
        this.state.setContext(this);
    }

    public getState(): string {
        return `State: ${this.state.name}`;
    }

    public publishDoc(): void {
        this.state.publish();
    }

    public deleteDoc(): void {
        this.state.delete();
    }
}

abstract class DocumentItemState {
    protected documentItem: DocumentItem;
    public name: string;

    public setContext(documentItem: DocumentItem) {
        this.documentItem = documentItem;
    }

    public abstract publish(): void;

    public abstract delete(): void;
}

class PublishedDocumentItemState extends DocumentItemState {
    constructor() {
        super();
        this.name = 'PublishedDocument';
    }

    public publish(): void {
        console.log('Document has already published');
    }

    public delete(): void {
        this.documentItem.setState(new DraftDocumentItemState());
    }
}

class DraftDocumentItemState extends DocumentItemState {
    constructor() {
        super();
        this.name = 'DraftDocument';
    }

    public publish(): void {
        this.documentItem.setState(new PublishedDocumentItemState())
    }

    public delete(): void {
        console.log('Document was deleted')
    }
}

const documentItem = new DocumentItem();
console.log(documentItem.getState());
documentItem.publishDoc();
documentItem.deleteDoc();