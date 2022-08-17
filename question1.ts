//Question 1

// first func: f: A -> [A] -> [A]
const addItem = <A>(a: A, l: Array<A>): Array<A> => {
  l[l.length] = a;
  return l;
};
const filter = <A>(a: A, l: Array<A>): Array<A> => {
  return l.filter((num) => num != a);
};

// second func: f: Number -> Number -> [A] -> [A]
const slice = <A>(x: number, y: number, l: Array<A>): Array<A> => l.slice(x, y);

// third function: f: [String] -> {String: any} -> {String: any}
type MyObject = {
  [key: string]: any;
};
const getValues = (l: Array<string>, obj: MyObject): MyObject => {
  return Object.keys(obj)
    .filter((key: string) => l.includes(key))
    .reduce((newObj: MyObject, key: string) => {
      newObj[key] = obj[key];
      return newObj;
    }, {});
};

const anObj: MyObject = {
  a: 123,
  b: 345,
  c: 678,
};
const aList: Array<string> = ["a", "b", "c"];
console.log(getValues(aList, anObj));

// fourth func
const zipperList = <A, B>(a: Array<A>, b: Array<B>): [A, B][] => {
  return a.map((val, index) => [val, b[index]]);
};
