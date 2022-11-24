interface IAuthStrategy {
    auth(user: User): boolean;
}

class User {
    githubToken: string;
    jwt: string;
}


class Auth {
    constructor(private strategy: IAuthStrategy) {}

    setStrategy(strategy: IAuthStrategy) {
        this.strategy = strategy;
    }
    
    public authorize(user: User): boolean {
        return this.strategy.auth(user);
    }
}

class JWTStrategy implements IAuthStrategy {
    auth(user: User): boolean {
        // check JWT
        if (user && user.jwt) return true;
        return false;
    }
}

class GitHubStrategy implements IAuthStrategy {
    auth(user: User): boolean {
        // call API
        if (user && user.githubToken) return true;
        return false;
    }
}

const user = new User();
user.jwt = 'token';
const auth = new Auth(new JWTStrategy());
const jwtAuthResult = auth.authorize(user);
console.log(jwtAuthResult)
auth.setStrategy(new GitHubStrategy())
const ghAuthResult = auth.authorize(user);
console.log(ghAuthResult)
