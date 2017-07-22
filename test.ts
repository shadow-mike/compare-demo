import { compare, getPrimitiveInfo } from "./compare";
import { PrimitiveInfo } from "./primitive-info.model";

/**
 * 深度比较
 */
const object1 = {
  id: 1,
  name: 'test',
  product: {
    id: 1,
    name: 'product'
  },
  updatedAt: 'now'
};
const objectA1 = {
  name: 'test',
  product: {
    name: 'product'
  }
};
const objectB1 = {
  name: 'test',
  product: {
    name: 'anotherProduct'
  }
};

/**
 * 比较Array
 */
const array2 = [{
  id: 1,
  name: 'test',
  product: {
    id: 1,
    name: 'product'
  },
  updatedAt: 'now'
}];
const arrayA2 = [{
  name: 'test',
  product: {
    name: 'product'
  }
}];
const arrayB2 = [{
  name: 'test',
  product: {
    name: 'anotherProduct'
  }
}];

/**
 * Object中嵌套Array
 */
const object3 = {
  id: 1,
  name: 'test',
  products: [{
    name: 'product'
  }],
  updatedAt: 'now'
};
const objectA3 = {
  name: 'test',
  products: [{
    name: 'product'
  }]
};
const objectB3 = {
  name: 'test',
  products: [{
    name: 'anotherProduct'
  }]
};

/**
 * 其他
 */
const array4 = [
  {
    a: [true, 2],
    b: {
      c: 1,
      d: [{e: 'e'}]
    }
  },
  Symbol('WaiJuLe'),
  function whatever() {},
  [],
];
const arrayA4 = [
  {
    b: {
      d: [{e: 'e'}]
    }
  },
  function whatever() {},
];

const tests: Array<Array<any>> = [
  [object1, objectA1,'a'],
  [object1, objectB1],
  [array2, arrayA2],
  [array2, arrayB2],
  [object3, objectA3],
  [object3, objectB3],
  [array4, arrayA4]
];

testing();

function testing() {
  tests.forEach((t, i) => {
    print(t);
    console.log(`result: ******************${compare(t[0], t[1])}******************
    `);
  });
}

function print(objs: Array<any>): void {
  objs.forEach((obj, i) => {
    console.log((i === 0 ? '  originalObj' : '  targetObj') + ':');
    printPrimitiveInfo(getPrimitiveInfo(obj));
  });
}

function printPrimitiveInfo(pis: Array<PrimitiveInfo>): void {
  pis.forEach((pi, i) => console.log(`path: ${pi.path.join('>')}; value: ${pi.value}`));
}
