class Car {
  constructor(
    public color: string,
    public price: number,
    public speed: number,
    public parktronic: boolean
  ) {}

  copy(): Car {
    return new Car(this.color, this.price, this.speed, this.parktronic);
  }
}

const car = new Car('black', 1000, 150, true);
console.log('car', car);

const copyCar = car.copy();
copyCar.color = 'white';
console.log('copy', copyCar);



