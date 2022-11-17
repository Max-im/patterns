interface ICar {
  capacity: number;
  parktronic: boolean;
  multilock: boolean;
  autopilot: boolean;
  price: number;
}

interface ICarBuilder {
  car: ICar;
  addTurbo(): ICarBuilder;
  addParktronic(): ICarBuilder;
  addMultilock(): ICarBuilder;
  addAutopilot(): ICarBuilder;
}

class Car implements ICar {
  capacity: number;
  parktronic: boolean;
  multilock: boolean;
  autopilot: boolean;
  price: number;

  constructor() {
    this.capacity = 100;
    this.parktronic = false;
    this.multilock = false;
    this.autopilot = false;
    this.price = 1000;
  }
}

class CarBuilder implements ICarBuilder {
  car: ICar;

  constructor() {
    this.car = new Car();
  }

  addTurbo() {
    this.car.capacity *= 2;
    this.car.price *= 1.5;
    return this;
  }
  addParktronic() {
    this.car.parktronic = true;
    this.car.price *= 1.1;
    return this;
  }
  addMultilock() {
    this.car.multilock = true;
    this.car.price *= 1.05;
    return this;
  }
  addAutopilot() {
    this.car.autopilot = true;
    this.car.price *= 1.2;
    return this;
  }
}

const basic = new CarBuilder();
console.log('basic', basic.car);

const turbo = new CarBuilder().addTurbo();
console.log('turbo', turbo.car);

const withParktronic = new CarBuilder().addParktronic();
console.log('parktronic', withParktronic.car);

const withMultilock = new CarBuilder().addMultilock();
console.log('multilock', withMultilock.car);

const withAuthopilot = new CarBuilder().addAutopilot();
console.log('autopilot', withAuthopilot.car);

const superCar = new CarBuilder().addAutopilot().addMultilock().addParktronic().addTurbo();
console.log('super', superCar.car);
