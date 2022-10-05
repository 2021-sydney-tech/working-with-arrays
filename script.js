'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
containerMovements.innerHTML = '';

// console.log(accounts);
const displayMovements = function (movements) {
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
          <div class="movements__type 
          movements__type--${type}">${i + 1} ${type}</div>
          
          <div class="movements__value">${mov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const user = 'Steven Thomas Williams'; // stw
const createUserNames = function (acc) {
  acc.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join(''); // stw
  });
};

createUserNames(accounts); // stw
console.log(accounts);

// update Current balance //////////
const calDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};
calDisplayBalance(account1.movements);

const calDisplaySummary = function (movements) {
  // calculate deposits
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  // calculate withdraw
  const outs = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outs)}€`;

  // calculate interest
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((interest, i, arr) => {
      console.log(arr);
      return interest > 1;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};
calDisplaySummary(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// currency conversion /////////

// PIPELINE
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const totalDepositUSD = movements
  .filter(mov => mov > 0) // step 1: filter all deposits
  // .map(mov => mov * eurToUsd) // step 2: convert eur to usd and copy this array
  .map((mov, i, arr) => {
    // we can do this way using the 3rd parameter of the callback function if we want to check if any error
    console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0); // step 3: sum up all the elements
console.log(totalDepositUSD);

/*
// Challenge 2: Dog Age ////////////////////////////////////////////

const calAvgHumanAge = function (ages) {
  const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAge.filter(age => age >= 18);
  console.log(humanAge);
  console.log(adults);

  // method 1
  //const agvAge = adults.reduce((acc, curr) => acc + curr, 0) / adults.length;

  // method 2
  const agvAge = adults.reduce(
    (acc, curr, i, arr) => acc + curr / arr.length,
    0
  );

  return agvAge;
};
const avg1 = calAvgHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calAvgHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

///////////////////////////////////////////////////////////////////////////

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
/*
// FILTER array
const deposits = movements.filter(mov => mov > 0);
console.log(movements);
console.log(deposits);
// using for of loop
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/

/*
// REDUCE method
// const balance = movements.reduce(function (acc, current, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + current;
// }, 0);

const balance = movements.reduce((acc, current) => acc + current, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);
*/

/*
// MAP method
const eurToUsd = 1.1;
// mothod 1: callback function
const movementsUSD = movements.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);
// method 2
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescription = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescription);
*/

/*

// Challenge 1 ///////////////////////////////////////////////////////////////

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1); // start from index 0, then remove 1 element
  dogsJuliaCorrected.splice(-2); // remove from index -2
  // dogsJulia.slice(1, 3);

  const dogs = dogsJuliaCorrected.concat(dogsKate);
  // console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old.`);
    } else {
      console.log(
        `Dog number ${i + 1} is still a puppy 🐶, and is ${dog} years old.`
      );
    }
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
///////////////////////////////////////////////////////////////
*/

// LECTURES
/*
// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SET
const currenciesUnique = new Set(['USD', 'EUR', 'GDP', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${value}`);
});

*/

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} : You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} : You withdrew ${Math.abs(movement)}`); // abs : to remove the negative sign
  }
}
console.log('----FOREACH------------');
movements.forEach(function (movement, i, arr) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} : You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} : You withdrew ${Math.abs(movement)}`); // abs : to remove the negative sign
  }
});

//

/*
// AT method
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0)); // the same result

// traditional ways getting the last array element
console.log(arr.length - 1); // to find what position for the last element
console.log(arr.slice(-1)[0]); // to get the the value of the last element. 64
// new way
console.log(arr.at(-1)); // 64

console.log('jonas'.at(-1)); // s

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// SLICE METHOD
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2)); // extract by starting at index 2
console.log(arr.slice(2, 4)); // the parameter = 4 -2 => 2 => means starting at position 2 to 3.
console.log(arr.slice(-1)); // the last element of the array
console.log(arr.slice(-2)); // start index -2, then -1
console.log(arr.slice(1)); // [b, c, d, e]
console.log(arr.slice(1, -2)); // [b, c]
console.log([...arr]); // ['a', 'b', 'c', 'd', 'e']
console.log(arr.slice()); // ['a', 'b', 'c', 'd', 'e']

// SPLICE: work the same as SLICE but it does change the original array. So it mutates the array
// console.log(arr.splice(2)); // ['c', 'd', 'e']
arr.splice(-1); // extract the index -1 then take out this index -1
console.log(arr); // ['a', 'b', 'c', 'd']
arr.splice(1, 2); // remove ['b', 'c']
console.log(arr); // update ['a', 'd']



// REVERSE METHOD: also does mutate the original array
let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // result the same

// JOIN
console.log(letters.join(' - '));

*/
