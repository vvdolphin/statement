function statement (invoice, plays) {
  return  generateTxtResult(invoice, plays);
}

module.exports = {
  statement,generateHtmlResult,
};

function generateTxtResult(invoice, plays) {
  let totalAmount = getTotalAmount(invoice, plays);
  let volumeCredits = getVolumeCredits(invoice, plays);
  let result = getTxtResult(invoice,plays);
  result += `Amount owed is ${formatAmount(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function generateHtmlResult(invoice, plays){
  let totalAmount = getTotalAmount(invoice, plays);
  let volumeCredits = getVolumeCredits(invoice, plays);
  let result = getHtmlResult(invoice,plays);
  result += `<p>Amount owed is <em>${formatAmount(totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${volumeCredits}</em> credits</p>\n`;
  return result;
}

function getHtmlResult(invoice, plays) {
  let result = `<h1>Statement for ${invoice.customer}</h1>\n`;
  result += '<table>\n'
  +'<tr><th>play</th><th>seats</th><th>cost</th></tr>';
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    result += ` <tr><td>${play.name}</td><td>${perf.audience}</td><td>${formatAmount(getAmount(play, perf))}</td></tr>\n`;
  }
  result += '</table>\n'
  return result;
}


function getTxtResult(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    result += ` ${play.name}: ${formatAmount(getAmount(play, perf))} (${perf.audience} seats)\n`;
  }
  return result;
}

function getVolumeCredits(invoice, plays) {
  let credits = 0;
  for (let perf of invoice.performances) {
    credits += getVolumeCredit(perf, plays[perf.playID]);
  }
  return credits;
}

function getTotalAmount(invoice, plays) {
  let count =0;
  for (let perf of invoice.performances) {
    count += getAmount(plays[perf.playID], perf);
  }
  return count;
}

function getVolumeCredit(perf, play) {
  let count = 0;
  count += Math.max(perf.audience - 30, 0);
  if ('comedy' === play.type)
  count += Math.floor(perf.audience / 5);
  return count;
}

function formatAmount(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount / 100);
}


function getAmount(play, perf) {
  let thisAmount = 0;

  if(play.type == 'tragedy'){
    thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
    return thisAmount;
  }

  if(play.type =='comedy'){
    thisAmount = 30000;
    if (perf.audience > 20) {
      thisAmount += 10000 + 500 * (perf.audience - 20);
    }
    thisAmount += 300 * perf.audience;
    return thisAmount;
  }
  throw new Error(`unknown type: ${play.type}`);

}

