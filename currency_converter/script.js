window.onload = () => { 
  var dollarValue = 64;
  var dollarExchangeRate = 5.32;
  
  var valueInReal = dollarValue * dollarExchangeRate;

  valueInReal.toFixed(2);

  alert("R$ " + valueInReal);
}