//Question 1

// first func
const addItem = <A>(a: A, l: Array<A>): Array<A> => {
  l[l.length] = a;
  return l;
};
const filter = <A>(a: A, l: Array<A>): Array<A> => {
  return l.filter((num) => num != a);
};

// second func
const slice = <A>(x: number, y: number, l: Array<A>): Array<A> => l.slice(x, y);

// fourth func
const zipperList = <A, B>(a: Array<A>, b: Array<B>): [A, B][] => {
  return a.map((val, index) => [val, b[index]]);
};
