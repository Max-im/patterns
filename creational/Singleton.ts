class Singleton {
    private static instance: Singleton;

    private constructor() { }

    public static get(): Singleton {
        if (Singleton.instance) Singleton.instance = new Singleton();

        return Singleton.instance;
    }

    public doSomething() {
        console.log('operate some logic');
    }
}


(function () {
    const instance1 = Singleton.get();
    const instance2 = Singleton.get();

    console.log('equal', instance1 === instance2)
})();
