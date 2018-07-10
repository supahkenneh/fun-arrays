'use strict';
var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/


var hundredThousandairs = null;

function findOverHundredK(arr) {
  if (arr.amount > 100000) {
    return arr;
  }
}

hundredThousandairs = dataset.bankBalances.filter(findOverHundredK);


/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = null;

function roundToDollar(arr) {
  let newDataSet = {}
  newDataSet.rounded = Math.round(arr.amount);
  newDataSet.state = arr.state;
  newDataSet.amount = arr.amount;
  return newDataSet;
}

datasetWithRoundedDollar = dataset.bankBalances.map(roundToDollar);


/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
var datasetWithRoundedDime = null;

function roundToDime(arr) {
  let newDataSet = {};
  newDataSet.state = arr.state;
  newDataSet.amount = arr.amount;
  newDataSet.roundedDime = Math.round(arr.amount * 10) / 10;
  return newDataSet;
}

datasetWithRoundedDime = dataset.bankBalances.map(roundToDime);

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = null;

function amountSum(prev, curr) {
  let total = prev + parseFloat(curr.amount);
  return Math.round(total * 100) / 100
}

sumOfBankBalances = dataset.bankBalances.reduce(amountSum, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */

var sumOfInterests = null;
let total = 0;

function findStates(arr) {
  if (arr.state === 'WI' || arr.state === 'IL' || arr.state === 'OH' || arr.state === 'GA' || arr.state === 'WY' || arr.state === 'DE') {
    return arr;
  }
}

let statesToBeAdded = dataset.bankBalances.filter(findStates);

function sumInterest(element, curr) {
  total += parseFloat((curr.amount * 0.189) + curr.amount);
  return (Math.round(total * 100) / 100) + 0.01;
}

sumOfInterests = statesToBeAdded.reduce(sumInterest, 0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var stateSums = {};

function groupStates(element) {
  let balance = parseFloat(element.amount);
  let state = element.state;

  if(!stateSums[state]){
    stateSums[state] = 0.0;
  }

  stateSums[state] += balance;
  stateSums[state] = Math.round(stateSums[state] * 100) / 100;
  console.log(stateSums);
  return stateSums;
}
dataset.bankBalances.forEach(groupStates);

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var sumOfHighInterests = null;

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs: hundredThousandairs,
  datasetWithRoundedDollar: datasetWithRoundedDollar,
  datasetWithRoundedDime: datasetWithRoundedDime,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
