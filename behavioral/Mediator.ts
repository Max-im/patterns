interface Mediator {
    notify(sender: object, event: string): void;
}

class ConcreteMediator implements Mediator {
    private client: Client;
    private admin: Admin;

    constructor(client: Client, admin: Admin) {
        this.client = client;
        this.client.setMediator(this);
        this.admin = admin;
        this.admin.setMediator(this);
    }

    public notify(sender: object, event: string): void {
        if (event === 'order') {
            this.admin.congrat();
        }

        if (event === 'promo') {
            this.client.usePromo();
            this.client.order();
        }
    }
}

class BaseComponent {
    protected mediator: Mediator;

    constructor(mediator?: Mediator) {
        this.mediator = mediator!;
    }

    public setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }
}

class Client extends BaseComponent {
    public order(): void {
        console.log('Client made order');
        this.mediator.notify(this, 'order');
    }

    public usePromo(): void {
        console.log('Client use promo');
        this.mediator.notify(this, 'usePromo');
    }
}

class Admin extends BaseComponent {
    public congrat(): void {
        console.log('Admin Congrat');
        this.mediator.notify(this, 'congrat');
    }

    public sendPromo(): void {
        console.log('Admin sent promo');
        this.mediator.notify(this, 'promo');
    }
}

const client = new Client();
const admin = new Admin();
const mediator = new ConcreteMediator(client, admin);

client.order();
admin.sendPromo();