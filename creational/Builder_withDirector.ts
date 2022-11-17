type size = 'S' | 'M' | 'L' | 'XL';
type num = 1 | 2 ;

interface Builder {
    addWatter(val: size): void;
    addSugar(val: num): void;
    addMilk(val: size): void;
    addCoffee(val: num): void;
}

class Coffee {
  public watter: size;
  public sugar: num;
  public milk: size;
  public coffee: num;

  public showCup(): void {
    console.log(this)
  }
}

class CoffeeBuilder implements Builder {
  private product: Coffee;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.product = new Coffee();
  }

  public addWatter(val: size): void {
    this.product.watter = val;
  }

  public addSugar(val: num): void {
    this.product.sugar = val;
  }

  public addMilk(val: size): void {
    this.product.milk = val;
  }

  public addCoffee(val: num) {
    this.product.coffee = val;
  }

  public getProduct(): Coffee {
    const result = this.product;
    this.reset();
    return result;
  }
}

class Director {
  private builder: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public mvp(): void {
    this.builder.addCoffee(1);
    this.builder.addWatter('S');
  }

  public superProduct(): void {
    this.builder.addCoffee(2);
    this.builder.addWatter('XL');
    this.builder.addSugar(2);
    this.builder.addMilk('XL');
  }
}

function app(director: Director) {
  const builder = new CoffeeBuilder();
  director.setBuilder(builder);

  console.log('mvp');
  director.mvp();
  builder.getProduct().showCup();

  console.log('super');
  director.superProduct();
  builder.getProduct().showCup();

  console.log('custom');
  builder.addCoffee(2);
  builder.addWatter('L');
  builder.addMilk('M');
  builder.getProduct().showCup();
}

const director = new Director();
app(director);
