const test = require('ava');
const {statement} = require('../src/statement');

test('test with no performance',t =>{
  //given
    const invoice = {
      'customer':'BigCo',
      'performances':[]
    }
    const result = statement(invoice,plays);
    const expectResult ='Statement for BigCo\n'
    +'Amount owed is $0.00\n'
    +'You earned 0 credits \n';
    t.is(result,expectResult);

})




// test('BigCo Buy Tickets', t => {
//   //given
//   const invoice = {
//       'customer': 'BigCo',
//       'performances': [
//           {
//               'playID': 'hamlet',
//               'audience': 55,
//           },
//           {
//               'playID': 'as-like',
//               'audience': 35,
//           },
//           {
//               'playID': 'othello',
//               'audience': 40,
//           },
//       ],
//   };
//   //when
//   const result = statement(invoice, plays);
//   const expectResult = 'Statement for BigCo\n'
//       + ` Hamlet: $650.00 (55 seats)\n`
//       + ` As You Like It: $580.00 (35 seats)\n`
//       + ` Othello: $500.00 (40 seats)\n`
//       + `Amount owed is $1,730.00\n`
//       + `You earned 47 credits \n`;
//   //then
//   t.is(result, expectResult);

// });




const invoice = {
  'customer': 'BigCo',
  'performances': [
    {
      'playID': 'tragedy',
      'audience': 55,
    },
    {
      'playID': 'comdey',
      'audience': 35,
    },
    {
      'playID': 'othello',
      'audience': 40,
    },
  ],
};


const plays = {
  'hamlet': {
    'name': 'Hamlet',
    'type': 'tragedy',
  },
  'as-like': {
    'name': 'As You Like It',
    'type': 'comedy',
  },
  'othello': {
    'name': 'Othello',
    'type': 'tragedy',
  },
};