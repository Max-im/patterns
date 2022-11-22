interface Handler {
    setNext(handler: Handler): Handler;

    handle(sum: number): string;
}

abstract class PaymentAbstractHandler implements Handler
{
    private nextHandler: Handler;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(sum: number): string {
        if (this.nextHandler) {
            return this.nextHandler.handle(sum);
        }

        throw new Error('Payment error');
    }
}

class Stripe extends PaymentAbstractHandler {
    public handle(sum: number): string {
        // check if enough money
        const balans = 100;
        if (sum < balans) {
            return `Stripe: You just paied ${sum}.`;
        }
        return super.handle(sum);

    }
}

class PayPal extends PaymentAbstractHandler {
    public handle(sum: number): string {
        const balans = 50;
        if (sum < balans) {
            return `PayPal: You just paied ${sum}.`;
        }
        return super.handle(sum);
    }
}

class Qiwi extends PaymentAbstractHandler {
    public handle(sum: number): string {
        const balans = 200;
        if (sum < balans) {
            return `Qiwi: You just paied ${sum}.`;
        }
        return super.handle(sum);
    }
}

function app(handler: Handler, chargeSum: number) {
    try {
        const result = handler.handle(chargeSum);
        console.log(result);
    } catch(err) {
        console.log('ERROR', err.message);
    }
}

const stripe = new Stripe();
const payPal = new PayPal();
const qiwi = new Qiwi();

stripe.setNext(payPal).setNext(qiwi);

app(stripe, 90);
app(stripe, 150);
app(stripe, 220);
