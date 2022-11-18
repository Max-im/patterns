interface IMainApi {
    firstname: string;
    lastname: string;
}

interface ISecondApi {
    name: string;
}

interface IRequestable {
    request(): IMainApi
}

class Api implements IRequestable{
    public request(): IMainApi {
        return {
            firstname: 'John',
            lastname: 'Dou'
        };
    }
}

class SecondApi {
    public specificRequest(): ISecondApi {
        return {
            name: 'John Dou'
        };
    }
}

class Adapter extends Api implements IRequestable {
    private secondApi: SecondApi;

    constructor(secondApi: SecondApi) {
        super();
        this.secondApi = secondApi;
    }

    public request(): IMainApi {
        const [firstname, lastname] = this.secondApi.specificRequest().name.split(' ');
        const adapted = {firstname, lastname};
        return adapted;
    }
}

function app(service: Api) {
    console.log(service.request());
}

console.log('Main Api response:');
const mainApi = new Api();
app(mainApi);

console.log('Second Api response:');
const secondApi = new SecondApi();
console.log(secondApi.specificRequest());

console.log('Adapted response:');
const adapted = new Adapter(secondApi);
app(adapted);