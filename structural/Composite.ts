abstract class Component {
    protected parent!: Component | null;

    public setParent(parent: Component | null) {
        this.parent = parent;
    }

    public getParent(): Component | null {
        return this.parent;
    }

    public add(component: Component): void { }

    public remove(component: Component): void { }

    public isComposite(): boolean {
        return false;
    }

    public abstract operation(): number;
}

// Leaf
class Person extends Component {
    constructor(public title: string, public salery: number) {
        super();
    }
    
    public operation(): number {
        return this.salery;
    }
}

// Branch
class Direction extends Component {
    protected children: Component[] = [];

    public add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }

    public operation(): number {
        let total = 0;

        for (const child of this.children) {
            total += child.operation();
        }

        return total;
    }
}

function app(component: Component) {
    console.log(component.operation());
}


const project = new Direction();

const frontend = new Direction();
frontend.add(new Person('senior', 1000));
frontend.add(new Person('junior', 500));

const backend = new Direction();
backend.add(new Person('senior', 1000));
backend.add(new Person('middle', 800));

const cicd = new Direction();
cicd.add(new Person('middle', 900));

const organisation = new Direction();
organisation.add(new Person('middle', 700));


project.add(frontend);
project.add(backend);
project.add(cicd);
project.add(organisation);

console.log('project budget')
app(project);
console.log('frontend budget')
app(frontend);
console.log('backend budget')
app(backend);
console.log('cicd budget')
app(cicd);
console.log('organisation budget')
app(organisation);
