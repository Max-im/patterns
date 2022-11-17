interface IRegularProduct {
    produce(): string;
}

interface IProProduct {
    produce(): string;
    compare(product: IRegularProduct): string;
}

interface AbstractFactory {
    createRegular(): IRegularProduct;
    createPro(): IProProduct;
}

class Apple implements AbstractFactory {
    public createRegular(): IRegularProduct {
        return new RegularApple();
    }

    public createPro(): IProProduct {
        return new ProApple();
    }
}

class Samsung implements AbstractFactory {
    public createRegular(): IRegularProduct {
        return new RegularSamsung();
    }

    public createPro(): IProProduct {
        return new ProSamsung();
    }
}

class RegularApple implements IRegularProduct {
    public produce(): string {
        return 'Regular Apple';
    }
}

class RegularSamsung implements IRegularProduct {
    public produce(): string {
        return 'Regular Samsung';
    }
}

class ProApple implements IProProduct {
    public produce(): string {
        return 'Pro Apple';
    }

    public compare(product: IRegularProduct): string {
        const result = product.produce();
        return `Pro Apple is better than ${result}`;
    }
}

class ProSamsung implements IProProduct {
    public produce(): string {
        return 'Pro Samsung';
    }

    public compare(product: IRegularProduct): string {
        const result = product.produce();
        return `Pro Samsung is better than ${result}`;
    }
}

function clientCode(factory: AbstractFactory) {
    const productA = factory.createRegular();
    const productB = factory.createPro();

    console.log(productB.produce());
    console.log(productB.compare(productA));
}

clientCode(new Samsung());
clientCode(new Apple());