function sayHello(person: string): string {
  console.log(person)
    return 'Hello, ' + person;
}

let user = 'Tom';
let res = sayHello(user);
console.log(res);
