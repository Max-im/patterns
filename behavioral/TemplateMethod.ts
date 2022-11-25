class Form {
    constructor(public name: string) {}
}

abstract class SubmitForm<T> {
    public submit(form: Form) {
        const result = this.fill(form);
        this.log(result);
        this.check(result);
        this.send(result);
    }

    protected abstract fill(form: Form): T

    protected abstract check(data: T): boolean

    protected log(data: T): void {
        console.log('LOG:', data);
    }

    protected abstract send(data: T): void
}

class ShippingSubmit extends SubmitForm<string> {
    protected fill(form: Form): string {
        return form.name;
    }
    protected check(data: string): boolean {
        // check form data
        return true;
    }
    protected send(data: string): void {
        // send to server
        console.log('Send Shipping data', data);
    }
}

interface IBillingData {
    paymentMethod: string;
    data: string
}

class BillingSubmit extends SubmitForm<IBillingData> {
    protected fill(form: Form): IBillingData {
        return {
            paymentMethod: 'PayPal',
            data: form.name
        };
    }
    protected check(data: IBillingData): boolean {
        // validation
        if (data.data === 'paymentForm') return true;
        return false;
    }
    protected send(data: IBillingData): void {
        // send
        console.log('Send billing data', data)   
    }
}

const paymentForm = new Form('paymentForm');
const shipping = new ShippingSubmit();
shipping.submit(paymentForm);

const billing = new BillingSubmit();
billing.submit(paymentForm);
