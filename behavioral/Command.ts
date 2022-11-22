interface ICommander {
    execute(accumulator: number, value: number): number;
    undo(accumulator: number, value: number): number;
    value: number;
}

function plus(x, y) { return x + y; }
function minus(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
function divide(x, y) { return x / y; }

abstract class Command implements ICommander {
    execute: (accumulator: number, value: number) => number;
    undo: (accumulator: number, value: number) => number;
    value: number;
    fn: any;

    constructor(execute, undo, value) {
        this.execute = execute;
        this.undo = undo;
        this.value = value;
        this.fn = this.constructor;
    }
}

class PlusCommand extends Command {
    constructor(value: number) {
        super(plus, minus, value);
    }
};

class MinusCommand extends Command {
    constructor(value: number) {
        super(minus, plus, value);
    }
};

class MultiplyCommand extends Command {
    constructor(value: number) {
        super(multiply, divide, value);
    }
};

class DivideCommand extends Command {
    constructor(value: number) {
        super(divide, multiply, value);
    }
};

class Calculator {
    current: number = 0;
    private commands: Command[] = [];

    private display(action: string, command: Command) {
        const name = command.fn.name.replace('Command', '');
        console.log(`${action} \t ${name} ${command.value} \t = ${this.current}`)
    }

    execute(command: Command) {
        this.current = command.execute(this.current, command.value);
        this.commands.push(command);
        this.display('Do', command);
    }
    
    undo() {
        var command = this.commands.pop();
        if (!command) return;
        this.current = command.undo(this.current, command.value);
        this.display('Undo', command);
    }

    getCurrent() {
        return this.current;
    }
}


var calculator = new Calculator();

calculator.execute(new PlusCommand(100));
calculator.execute(new MinusCommand(24));
calculator.execute(new MultiplyCommand(6));
calculator.execute(new DivideCommand(2));

calculator.undo();
calculator.undo();
