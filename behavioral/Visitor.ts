class Employee {
    constructor(public name: string, public salary: number, public vacation: number) {}

    accept(visitor) {
        visitor.visit(this);
    };

    getName(): string {
        return this.name;
    };

    getSalary(): number {
        return this.salary;
    };

    getVacation(): number {
        return this.vacation;
    };

    setVacation(vacation: number): void {
        this.vacation = vacation;
    };

    setSalary(salary: number) {
        this.salary = salary;
    };

    show() {
        console.log(this);
    }
};

class AddSalary {
    visit(employee: Employee) {
        employee.setSalary(Math.round(employee.getSalary() * 1.1));
    };
};

class AddVacation {
    visit(employee: Employee) {
        employee.setVacation(employee.getVacation() + 2);
    };
};


const employees = [
    new Employee("John", 1000, 21),
    new Employee("Mary", 1500, 22),
    new Employee("Bob", 2000, 25)
];

const visitorSalary = new AddSalary();
const visitorVacation = new AddVacation();

for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];

    employee.show()
    employee.accept(visitorSalary);
    employee.accept(visitorVacation);
    employee.show()
}
