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

function handleConvertTemperature(value, input) {
  const input_1 = document.getElementById("input_1");
  const input_2 = document.getElementById("input_2");

  const select_1 = document.getElementById("select_1")
  const select_2 = document.getElementById("select_2")

  if (input === "input_1") {
    if (select_1.value === "c") {
      if (select_2.value=== "c") { input_2.value  = value }
      if (select_2.value === "f") { input_2.value = convertCelsiusToFahrenheit(value) }
      if (select_2.value === "k") { input_2.value = convertCelsiusToKelvin(value) }
    }

    if (select_1.value === "f") {
      if (select_2.value === "c") { input_2.value = convertFahrenheitToCelsius(value) }
      if (select_2.value === "f") { input_2.value = value }
      if (select_2.value === "k") { input_2.value = convertFahrenheitToKelvin(value) } 
    }

    if (select_1.value === "k") {
      if (select_2.value === "c") { input_2.value = convertKelvinToCelsius(value) }
      if (select_2.value === "f") { input_2.value = convertKelvinToFahrenheit(value) }
      if (select_2.value === "k") { input_2.value = value }
    }
  }

  if (input === "input_2") {
    if (select_2.value === "c") {
      if (select_1.value === "c") { input_1.value  = value }
      if (select_1.value === "f") { input_1.value = convertCelsiusToFahrenheit(value) }
      if (select_1.value === "k") { input_1.value = convertCelsiusToKelvin(value) }
    }

    if (select_2.value === "f") {
      if (select_1.value === "c") { input_1.value = convertFahrenheitToCelsius(value) }
      if (select_1.value === "f") { input_1.value = value }
      if (select_1.value === "k") { input_1.value = convertFahrenheitToKelvin(value) } 
    }
    
    if (select_2.value === "k") {
      if (select_1.value === "c") { input_1.value = convertKelvinToCelsius(value) }
      if (select_1.value === "f") { input_1.value = convertKelvinToFahrenheit(value) }
      if (select_1.value === "k") { input_1.value = value }
    }
  }
}

function convertCelsiusToFahrenheit(value) {
  const result = (value * 9 / 5) + 32;
  const format = result.toFixed(4).replace(/\.0+$/, "");
  
  return format;
}

function convertCelsiusToKelvin(value) {
  const result = value + 273.15;
  const format = result.toFixed(4).replace(/\.0+$/, "");

  return format;
}

function convertFahrenheitToCelsius(value) {
  const result = (value - 32) * 5 / 9;
  const format = result.toFixed(4).replace(/\.0+$/, "");

  return format;
}

function convertFahrenheitToKelvin(value) {
  const result = (value - 32) * 5 / 9 + 273.15;
  const format = result.toFixed(4).replace(/\.0+$/, "");

  return format;
}

function convertKelvinToCelsius(value) {
  const result = value - 273.15;
  const format = result.toFixed(4).replace(/\.0+$/, "");

  return format;
}

function convertKelvinToFahrenheit(value) {
  const result = (value - 273.15) * 9 / 5 + 32;
  const format = result.toFixed(4).replace(/\.0+$/, "");

  return format;
}