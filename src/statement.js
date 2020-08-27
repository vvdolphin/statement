function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
 
  totalAmount += getTotalAmount(invoice, plays);

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = getAmount(play, perf);
    // add volume credits
    volumeCredits += getVolumeCredits(perf, play);
    //print line for this order
    result += ` ${play.name}: ${formatAmount(thisAmount)} (${perf.audience} seats)\n`;
    // totalAmount += thisAmount;
  }

  result += `Amount owed is ${formatAmount(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

module.exports = {
  statement,
};

function getTotalAmount(invoice, plays) {
  let count =0;
  for (let perf of invoice.performances) {
    count += getAmount(plays[perf.playID], perf);
  }
  return count;
}

function getVolumeCredits( perf, play) {
  let count = 0;
  count += Math.max(perf.audience - 30, 0);
  // add extra credit for every ten comedy attendees
  if ('comedy' === play.type)
  count += Math.floor(perf.audience / 5);
  return count;
}

function formatAmount(amount) {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  return format(amount / 100);
}

function getAmount(play, perf) {
  let thisAmount = 0;
  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

