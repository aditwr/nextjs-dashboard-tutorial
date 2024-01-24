// function doSomething() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // Other things to do before completion of the promise
//       console.log('Did something');
//       resolve({
//         name: 'John',
//         age: 30,
//         job: 'Software Engineer',
//         salary: 1000000,
//         married: true,
//         children: 2,
//         skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js'],
//       });
//     }, 2000);
//     // reject('error');
//   });
// }

// const promise = doSomething();
// console.log(promise); // Promise { <pending> }
// var fullname, capabilities;
// promise.then(
//   (result) => {
//     const { name, skills } = result;
//     fullname = name;
//     capabilities = skills;
//     console.log(fullname, capabilities);
//   } /* onFulfilled */,
//   (error) => console.log(error) /* onRejected */,
// );

// function doThings() {
//   return new Promise((resolveOuter) => {
//     setTimeout(() => {
//       console.log('Outer proccess completed');
//       resolveOuter({ process: 'outer', completed: true, keyword: 'coding' });
//     }, 2000);
//   });
// }
// function doMoreThings(keyword) {
//   return new Promise((resolveInner) => {
//     setTimeout(() => {
//       if (keyword === 'coding') {
//         console.log('Inner proccess completed');
//         resolveInner({
//           process: 'inner',
//           completed: true,
//           keyword: 'coding',
//           resultSet: ['ReactJs', 'Javascript', 'NextJS'],
//         });
//       } else {
//         // console.log('Inner proccess failed');
//         // resolveInner({
//         //   process: 'inner',
//         //   completed: false,
//         //   keyword: 'coding',
//         //   resultSet: [],
//         // });
//         throw new Error('Inner proccess failed');
//       }
//     }, 2000);
//   });
// }

// const promise = doThings();
// console.log(promise); // Promise { <pending> }
// promise
//   .then((result) => {
//     const { keyword } = result;
//     return doMoreThings(keyword);
//   })
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

// const promise1 = Promise.resolve('Promise 1 resolved');
// const promise2 = 99;
// const promise3 = new Promise((resolve, reject) => {
//   // reject(new Error('Promise 3 rejected'));
//   setTimeout(resolve, 3000, 'Promise 3 resolved');
// });

// // promise1.then((result) => console.log(result));
// // console.log(promise2);
// // promise3.then((result) => console.log(result));

// const promise4 = Promise.all([promise1, promise2, promise3]);
// promise4
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

// const promise1 = Promise.resolve(3);
// const promise2 = new Promise((resolve, reject) =>
//   setTimeout(reject, 2000, 'promise 2 rejected'),
// );
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 1000, 'promise 3 resolved');
// });
// const promises = [promise1, promise2, promise3];

// Promise.allSettled(promises).then((results) => {
//   console.log(results);
//   results.forEach((result) => console.log(result.status));
// });

// const promise = new Promise((resolve, reject) => {
//   setTimeout(resolve, 3000, 'Promise resolved');
//   console.log('Promise started');
// });

// function resolveAfter3Seconds() {
//   console.log('starting promise');
//   return new Promise((resolve, reject) => {
//     setTimeout(function () {
//       reject(new Error('promise rejected'));
//       resolve('promise resolved');
//     }, 3000);
//   });
// }

// // synchronous function approach
// function syncCall() {
//   console.log('calling synchronous function');
//   const result = resolveAfter3Seconds();
//   result
//     .then((value) => console.log(value))
//     .catch((error) => console.error(error));
// }

// // async function approach
// async function asyncCall() {
//   try {
//     console.log('calling async function');
//     const result = await resolveAfter3Seconds();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
//   console.log('program continues...');
// }

// asyncCall();
// console.log('synchrounous line...');

// async function foo1() {
//   return 1;
// }
// function foo2() {
//   return Promise.resolve(1);
// }

// const bar1 = foo1();
// const bar2 = foo2();
// console.log(bar1); // Promise { 1 }
// console.log(bar2); // Promise { 1 }
// if (bar1 == bar2) {
//   console.log('bar1 and bar2 are equal');
// }

// async function foo() {
//   const result1 = await new Promise((resolve) =>
//     setTimeout(() => resolve('resolve promise 1'), 3000),
//   );
//   console.log(result1);
//   const result2 = await new Promise((resolve) =>
//     setTimeout(() => resolve('resolve promise 2'), 2000),
//   );
//   console.log(result2);
// }
// foo();

function resolveAfter2Seconds() {
  console.log('starting slow promise');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('slow');
      console.log('slow promise is done');
    }, 4000);
  });
}

function resolveAfter1Second() {
  console.log('starting fast promise');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('fast');
      console.log('fast promise is done');
    }, 2000);
  });
}

// async function execution order
// sequential start
// async function sequentialStart() {
//   console.log('== sequntialStart starts ==');

//   // 1. start a timer, log after it's done
//   const slow = await resolveAfter2Seconds();
//   console.log(slow); // 2. this runs 2 seconds after 1.

//   const fast = await resolveAfter1Second();
//   console.log(fast); // 3. this runs 3 seconds after 1., immediately after 2., since fast is already resolved

//   console.log('== sequntialStart ends ==');
// }

// sequentialStart();

// sequential wait
// async function sequentialWait() {
//   console.log('== sequentialWait starts ==');

//   const slow = resolveAfter2Seconds();
//   const fast = resolveAfter1Second();
//   // execution above is run synchronously and in order, so the timers start

//   console.log(await fast); // 2. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
//   console.log(await slow); // 1. this runs 2 seconds after 1.
// }

// sequentialWait();

// concurrent
// async function concurrent1() {
//   console.log('== concurrent1 starts ==');

//   const results = await Promise.all([
//     resolveAfter2Seconds(),
//     resolveAfter1Second(),
//   ]);

//   console.log(results[0]); // slow
//   console.log(results[1]); // fast

//   console.log('== concurrent1 ends ==');
// }

// // concurrent1();

// async function concurrent2() {
//   console.log('== concurrent2 ==');

//   await Promise.all([
//     (async () => {
//       const result = await resolveAfter2Seconds();
//       console.log(result);
//     })(),
//     (async () => {
//       const result = await resolveAfter1Second();
//       console.log(result);
//     })(),
//   ]);

//   console.log('== concurrent2 ends ==');
// }

// concurrent2();

const paramsString = 'year=2021&month=february&day=monday';
const searchParams = new URLSearchParams(paramsString);

// iterating the search parameters
for (const p of searchParams) {
  console.log(p);
}
