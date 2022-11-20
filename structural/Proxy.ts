interface IApi {
    request(): string;
}

class Api implements IApi {
    public request(): string {
        return 'Api Response';
    }
}

class ApiProxy implements IApi {
    private realSubject: Api;

    constructor(realSubject: Api) {
        this.realSubject = realSubject;
    }

    public request(): string {
        if (!this.checkAccess()) throw new Error('Auth error');

        const cache = this.checkInCache();
        if (cache) return cache;

        const result = this.realSubject.request();
        this.saveInCache(result);
        this.logAccess();

        return result
    }

    private checkAccess(): boolean {
        console.log('Checking user access');

        return true;
    }

    private checkInCache(): string | null {
        console.log('Check in cache');

        return null;
    }

    private saveInCache(result): void {
        console.log('Save in cache');
    }

    private logAccess(): void {
        console.log('Logger');
    }
}

function app(subject: IApi) {
    subject.request();
}

const api = new Api();
app(api);

const proxy = new ApiProxy(api);
app(proxy);