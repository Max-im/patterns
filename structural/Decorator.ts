interface Component {
    getData(): Component;
}

interface IUserWithGroup extends Component {
    group: string
}

class User implements Component {
    constructor (public name: string) {}
    public getData(): Component {
        return this;
    }
}

class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    public getData(): Component {
        return this.component.getData();
    }
}

class UserWithGroupDecorator extends Decorator {
    public getData(): IUserWithGroup {
        return {
            ...super.getData(),
            group: 'VIP'
        };
    }
}

function app(component: Component) {
    console.log(component.getData());
}


const user = new User('John');
app(user);
const userWithGroup = new UserWithGroupDecorator(user);
app(userWithGroup);