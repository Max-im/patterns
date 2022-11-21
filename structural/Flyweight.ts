class Flyweight {
  private sharedState: any;

  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState): void {
    const shared = JSON.stringify(this.sharedState);
    const unique = JSON.stringify(uniqueState);
    console.log(`Flyweight: Displaying shared (${shared}) and unique (${unique}) state.`);
  }
}

class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = <any>{};

  constructor(initialFlyweights: string[][]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  private getKey(state: string[]): string {
    return state.join('_');
  }

  public getFlyweight(state: string[]): Flyweight {
    const key = this.getKey(state);

    if (!(key in this.flyweights)) {
      this.flyweights[key] = new Flyweight(state);
    } else console.log('Got from cache');

    return this.flyweights[key];
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(count, 'items');
  }
}

const dump = [
  ['Chevrolet', 'Camaro2018', 'pink'],
  ['Mercedes Benz', 'C300', 'black'],
  ['Mercedes Benz', 'C500', 'red'],
  ['BMW', 'M5', 'red'],
  ['BMW', 'X6', 'white'],
];

const factory = new FlyweightFactory(dump);
factory.listFlyweights();

interface IAutoData {
  factory: FlyweightFactory;
  plates: string;
  owner: string;
  brand: string;
  model: string;
  color: string;
}

function addCarToPoliceDatabase(data: IAutoData) {
  const flyweight = data.factory.getFlyweight([data.brand, data.model, data.color]);

  flyweight.operation([data.plates, data.owner]);
}

addCarToPoliceDatabase({
  factory,
  plates: 'CL234IR',
  owner: 'James Doe',
  brand: 'BMW',
  model: 'M5',
  color: 'red',
});

addCarToPoliceDatabase({
  factory,
  plates: 'CL234IR',
  owner: 'James Doe',
  brand: 'BMW',
  model: 'X1',
  color: 'red',
});

factory.listFlyweights();
