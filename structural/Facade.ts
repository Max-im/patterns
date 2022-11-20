class Facade {
    protected bank: Bank;
    protected notary: Notary;

    constructor(bank?: Bank, notary?: Notary) {
        this.bank = bank || new Bank();
        this.notary = notary || new Notary();
    }

    public operation(): boolean {
        let result = true;

        if (result && !this.bank.check()) result = false;
        if (result && !this.bank.transaction()) result = false;
        if (result && !this.notary.verify()) result = false;
        if (result && !this.notary.certify()) result = false;

        return result;
    }
}

class Bank {
    public check(): boolean {
        // check documents
        return true;
    }

    public transaction(): boolean {
        // commit transaction
        return true;
    }
}

class Notary {
    public verify(): boolean {
        // verify documents
        return true;
    }

    public certify(): boolean {
        // certify documents
        return true;
    }
}

function app(facade: Facade) {
    console.log(facade.operation());
}

const bank = new Bank();
const notary = new Notary();
const facade = new Facade(bank, notary);
app(facade);
