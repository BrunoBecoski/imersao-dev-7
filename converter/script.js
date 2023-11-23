// window.onload = () => { 
//   var dollarValue = 64;
//   var dollarExchangeRate = 5.32;
  
//   var valueInReal = dollarValue * dollarExchangeRate;

//   valueInReal.toFixed(2);

//   alert("R$ " + valueInReal);
// }

// const currencies = [
//   {
//     code: 'brl',
//     name: 'Real brasileiro',
//     value: {
//       'ars': 0.014,
//       'cny': 0.68,
//       'eur': 5.36,
//       'usd': 4.91,
//     },
//   },
//   {
//     code: 'usd',
//     name: 'Dólar americano',
//     value: {
//       'ars': 0.0028,
//       'brl': 0.20,
//       'cny': 0.14,
//       'eur': 1.09,
//     },
//   },
//   {
//     code: 'eur',
//     name: 'Euro',
//     value: {
//       'ars': 0.0026,
//       'brl': 0.19,
//       'cny': 0.13,
//       'usd': 0.92,
//     },
//   },
//   {
//     code: 'cny',
//     name: 'Yuan chinês',
//     value: {
//       'ars': 48.78,
//       'brl': 0.68,
//       'eur': 0.13,
//       'usd': 0.14,
//     },
//   },
//   {
//     code: 'ars',
//     name: 'Peso argentino',
//     value: {
//       'brl': 0.014,
//       'cny': 0.020,
//       'eur': 0.0026,
//       'usd': 0.0028,
//     },
//   }
// ]

// function handleInput(value, item) {
//   if (item === 'first') {
//     const codeSelected = document.getElementById("select_1").value;

//     const codeToConvert = document.getElementById("select_2").value;

//     const currencySelected = currencies.find(currency => currency.code === codeSelected);

//     const valueToConvert = currencySelected.value[codeToConvert];

//     const currency = valueToConvert * value;

//     const currencyFormatted = currency.toFixed(2);

//     const inputToConverter = document.getElementById('input_2');

//     inputToConverter.value = currencyFormatted;
//   }

//   if (item === 'second') {
//     const codeSelected = document.getElementById("select_2").value;

//     const codeToConvert = document.getElementById("select_1").value;

//     const currencySelected = currencies.find(currency => currency.code === codeSelected);

//     const valueToConvert = currencySelected.value[codeToConvert];

//     const currency = valueToConvert * value;

//     const currencyFormatted = currency.toFixed(2);

//     const inputToConverter = document.getElementById('input_1');

//     inputToConverter.value = currencyFormatted;
//   }
// }

function handleInput(current_input, new_input) { 
  const current_temperature = document.getElementById(`select_${current_input}`).value;
  const new_temperature = document.getElementById(`select_${new_input}`).value;

  const degree_current = document.getElementById(`input_${current_input}`).value;
  const degree_new = document.getElementById(`input_${new_input}`);

  const degree_converted = convertTemperature(current_temperature, new_temperature, Number(degree_current));

  if (isNaN(degree_converted)) {
    degree_new.value = "";
  } else {
    degree_new.value = degree_converted;
  }
}

function convertTemperature(current_temperature, new_temperature, degree ) {
  switch (current_temperature) {
    case 'c':
      switch (new_temperature) {
        case 'c':
          return degree;
        case 'f':
          return ((degree * 9 / 5) + 32).toFixed(2);
        case 'k':
          return (degree + 273.15).toFixed(2);
      }
      
    case 'f':
      switch (new_temperature) {
        case 'c':
          return ((degree - 32) * 5 / 9).toFixed(2);  
        case 'f':
          return degree;
        case 'k':
          return ((degree - 32) * 5 / 9 + 273.15).toFixed(2);
      }
    
    case 'k':
      switch (new_temperature) {
        case 'c':
          return (degree - 273.15).toFixed(2);
        case 'f':
          return ((degree - 273.15) * 9 / 5 + 32).toFixed(2);
        case 'k':
          return degree;
      }
  }
}