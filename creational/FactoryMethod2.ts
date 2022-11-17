class CoffeeCup {
  name: string;
  milk: boolean;
  size: 'S' | 'M' | 'L' | 'XL';
  cost: number;

  constructor(name, milk, size, cost) {
    this.name = name;
    this.milk = milk;
    this.size = size;
    this.cost = cost;
  }
}

class CoffeeCupFactory {
  create(type) {
    if (type === 'espresso') {
      return new Coffee(type, false, 'S', 5);
    }
    if (type === 'americano') {
      return new Coffee(type, false, 'M', 10);
    }
    if (type === 'cappuccino') {
      return new Coffee(type, true, 'L', 15);
    }
    if (type === 'latte') {
      return new Coffee(type, true, 'XL', 20);
    }
    return 'Unknown type: ' + type;
  }
}

(function () {
    const factory = new CoffeeFactory();
    
    console.log(factory.create('espresso'));
    console.log(factory.create('americano'));
    console.log(factory.create('cappuccino'));
    console.log(factory.create('latte'));
    console.log(factory.create('another'));
})();
