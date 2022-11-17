abstract class Fabric {
    public abstract factoryMethod(): Product;

    public startProduce(): string {
        const product = this.factoryMethod();
        return `Run from abstract Fabric ${product.produce()}`;
    }
}

class PhoneFabric extends Fabric {
    public factoryMethod(): Product {
        return new Phone();
    }
}

class LaptopFabric extends Fabric {
    public factoryMethod(): Product {
        return new Laptop();
    }
}

interface Product {
    produce(): string;
}

class Phone implements Product {
    public produce(): string {
        return 'Phone';
    }
}

class Laptop implements Product {
    public produce(): string {
        return 'Laptop';
    }
}

function runFactory(factory: Fabric) {
    console.log(factory.startProduce());
}

(function() {
    runFactory(new PhoneFabric());
    runFactory(new LaptopFabric());
})();