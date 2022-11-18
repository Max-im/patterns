interface IColor {
  type: string;
  get(): string;
}

interface IModel {
  name: string;
  color: IColor;
  getData(): { name: string; color: string };
}

class Color implements IColor {
  constructor(public type: string) {}

  get() {
    return this.type;
  }
}

class Model implements IModel {
  constructor(public name: string, public color: IColor) {}

  getData() {
    return {
      name: this.name,
      color: this.color.get(),
    };
  }
}

class BlackColor extends Color {
  constructor() {
    super('black');
  }
}

class SilverColor extends Color {
  constructor() {
    super('silver');
  }
}

class Opel extends Model {
  constructor(name: string, color: IColor) {
    super(name, color);
  }
}

class Bmw extends Model {
  constructor(name: string, color: IColor) {
    super(name, color);
  }
}

const blackOpel = new Opel('opel', new BlackColor());
console.log(blackOpel.getData());

const silverOpel = new Opel('opel', new SilverColor());
console.log(silverOpel.getData());

const blackBmv = new Opel('bmv', new BlackColor());
console.log(blackBmv.getData());

const silverBmv = new Opel('bmv', new SilverColor());
console.log(silverBmv.getData());
