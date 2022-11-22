interface Iterator<T> {
  next(): T;
  hasNext(): boolean;
}

class ArrayIterator implements Iterator<any> {
  public index: number;
  public elements: any;

  constructor(elements) {
    this.index = 0;
    this.elements = elements;
  }

  next() {
    return this.elements[this.index++];
  }

  hasNext() {
    return this.index < this.elements.length;
  }
}

class ObjectIterator implements Iterator<{ [key: string]: any }> {
  public index: number;
  public keys: string[];
  public elements: { [key: string]: any };

  constructor(elements) {
    this.index = 0;
    this.keys = Object.keys(elements); 
    this.elements = elements;
  }

  next() {
    const key = this.keys[this.index++];
    return {key, value: this.elements[key]};
  }

  hasNext() {
    return this.index < this.keys.length;
  }
}

const collection = new ArrayIterator(['js', 'c#', 'python', 'ts', 'ruby', 'rust']);

while (collection.hasNext()) {
  console.log(collection.next());
}

const objects = new ObjectIterator({
  js: { compiled: false },
  'c#': { compiled: true },
  python: { compiled: false },
  ts: { compiled: true },
  ruby: { compiled: true },
  rust: { compiled: true }
});

while (objects.hasNext()) {
  console.log(objects.next());
}
