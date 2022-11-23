interface Observer {
    update(subject: IObservable): void;
}

interface IObservable {
    subscribe(observer: Observer): void;

    unsubscribe(observer: Observer): void;

    notify(): void;
}

class CreateOrder implements IObservable {
    public sum: number;

    private observers: Observer[] = [];

    public subscribe(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) return console.log('Observer has been already subscribed');

        console.log('Observer subscribed', observer);
        this.observers.push(observer);
    }

    public unsubscribe(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index === -1) return console.log('Observer was not subscribed');

        this.observers.splice(index, 1);
        console.log('Observer: unsubscribed', observer);
    }

    public notify(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    public run(sum: number): void {
        console.log('Create new order', sum)
        this.sum = sum;
        this.notify();
    }
}

class Admin implements Observer {
    public update(subject: IObservable): void {
        if (subject instanceof CreateOrder) {
            console.log('Admin: Send message ' + subject.sum);
        }
    }
}

class Payment implements Observer {
    public update(subject: IObservable): void {
        if (subject instanceof CreateOrder) {
            console.log('Payment: update user balanse');
        }
    }
}

class Logger implements Observer {
    public update(subject: IObservable): void {
        if (subject instanceof CreateOrder) {
            console.log('Logger: add log');
        }
    }
}

const createOrder = new CreateOrder();

const admin = new Admin();
const payment = new Payment();
const logger = new Logger();

createOrder.subscribe(admin);
createOrder.subscribe(payment);
createOrder.subscribe(logger);

createOrder.run(100);

createOrder.unsubscribe(logger);

createOrder.run(150);