interface IFooBar {
    foo: string;
    bar: string;
}

const fooBars: Array<IFooBar> = [
    {
        foo: "foo1",
        bar: "bar1"
    },
    {
        foo: "i am foo two",
        bar: "i am bar two"
    },
    {
        foo: "foo three",
        bar: "bar three"
    }
]

function sortByFoo(fooBars: Array<IFooBar>) {
    fooBars.sort((a, b) => {
        if (a.foo > b.foo) {
            return 1;
        }
        if (a.foo < b.foo) {
            return -1;
        }
        return 0;
    })
}

function sortByBar(fooBars: Array<IFooBar>) {
    fooBars.sort((a, b) => {
        if (a.bar > b.bar) {
            return 1;
        }
        if (a.bar < b.bar) {
            return -1;
        }
        return 0;
    })
}

function sortByKey<T>(data: Array<T>, key: keyof T) {
    data.sort((a, b) => {
        if (a[key] > b[key]) {
            return 1;
        }
        if (a[key] < b[key]) {
            return -1;
        }
        return 0;
    })
}

// Both fine: foo and bar are properties of IFooBar!
sortByKey<IFooBar>(fooBars, "foo")
sortByKey<IFooBar>(fooBars, "bar")

// TypeScript complains: cat is not a property of IFooBar!
sortByKey<IFooBar>(fooBars, "cat")

class Animal {
    public legCount: number;
    constructor(legCount: number) {
        this.legCount = legCount
    }
}

class Cat extends Animal {
    constructor() {
        super(4);
    }
}

class Kangaroo extends Animal {
    constructor() {
        super(2);
    }
}

class Bacteria {

}

function printLegCount<T extends Animal>(animal: T) {
    console.log(`My leg count is: ${animal.legCount}`);
}

const myCat = new Cat();

const myKangaroo = new Kangaroo();

printLegCount(myCat);

printLegCount(myKangaroo);

const myBacteria = new Bacteria();

// TypeScript complains, since the Bacteria class does not extend animal!
printLegCount(myBacteria);