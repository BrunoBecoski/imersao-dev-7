// window.onload = () => { 
//   var dollarValue = 64;
//   var dollarExchangeRate = 5.32;
  
//   var valueInReal = dollarValue * dollarExchangeRate;

//   valueInReal.toFixed(2);

//   alert("R$ " + valueInReal);
// }

const currencies = [
  {
    value: 'ars',
    name: 'Peso argentino',
    calc: {
      'brl': 0.014,
      'cny': 0.020,
      'eur': 0.0026,
      'usd': 0.0028,
    },
  },
  {
    value: 'brl',
    name: 'Real brasileiro',
    calc: {
      'ars': 0.014,
      'cny': 0.68,
      'eur': 5.36,
      'usd': 4.91,
    },
  },
  {
    value: 'cny',
    name: 'Yuan chinês',
    calc: {
      'ars': 48.78,
      'brl': 0.68,
      'eur': 0.13,
      'usd': 0.14,
    },
  },
  {
    value: 'eur',
    name: 'Euro',
    calc: {
      'ars': 0.0026,
      'brl': 0.19,
      'cny': 0.13,
      'usd': 0.92,
    },
  },
  {
    value: 'usd',
    name: 'Dólar americano',
    calc: {
      'ars': 0.0028,
      'brl': 0.20,
      'cny': 0.14,
      'eur': 1.09,
    },
  },
];

const temperatures = [
  {
    value: 'celsius',
    name: 'Grau Celsius',
    calc: {
      'fahrenheit': (value) => Math.trunc((value * 9 / 5) + 32),
      'kelvin': (value) => Math.trunc(value + 273.15),
    },    
  },
  {
    value: 'fahrenheit',
    name: 'Grau Fahrenheit',
    calc: {
      'celsius': (value) => Math.trunc((value - 32) * 5 / 9),
      'kelvin': (value) => Math.trunc((value - 32) * 5 / 9 + 273.15),
    },
  },
  {
    value: 'kelvin',
    name: 'Kelvin',
    calc: {
      'celsius': (value) => Math.trunc(value - 273.15),
      'fahrenheit': (value) => Math.trunc((value - 273.15) * 9 / 5 + 32),
    },
  },
];

let select_element_1 = document.getElementById("select_1");
let select_element_2 = document.getElementById("select_2");

let input_element_1 = document.getElementById("input_1");
let input_element_2 = document.getElementById("input_2");

handleSelectMode();

function handleSelectMode() {
  const selectedMode = document.getElementById("mode_selection").value;

  switch (selectedMode) {
    case "currency":
      fillSelects(currencies);
      break;
      
    case "temperature":
      fillSelects(temperatures);
      break;
        
    case "length":
      console.log("Comprimento");
      break;
      
    default:  "currency"
      fillSelects(currencies);
  }
}

function fillSelects(items) { 
  select_element_1.innerHTML = "";
  select_element_2.innerHTML = "";
  input_element_1.value = "";
  input_element_2.value = "";

  createOptions(items).forEach((option, index) => {
    if (index === 0) {
      option.selected = true;
      select_element_1.appendChild(option);
    } else {
      select_element_1.appendChild(option);
    }
  });
    
  createOptions(items).forEach((option, index) => {
    if (index === 1) {
      option.selected = true;
      select_element_2.appendChild(option);
    } else {
      select_element_2.appendChild(option);
    }
  });
}

function createOptions(items) {
  return items.map((item) => {
    const option = document.createElement("option");
    option.innerText = item.name;
    option.value = item.value;

    return option;
  })
}

function getValues(value) {
  let currentInputValue;
  let currentSelectValue;
  let newSelectValue;

  switch (value) {
    case 'input_1':
    case 'select_1':
      currentInputValue = input_element_1.value;
      newInput = input_element_2;
      currentSelectValue = select_element_1.value;
      newSelectValue = select_element_2.value;    
      break;
        
    case 'input_2':
    case 'select_2':
      currentInputValue = input_element_2.value;
      newInput = input_element_1;
      currentSelectValue = select_element_2.value;
      newSelectValue = select_element_1.value;
      break;
  }
  
  return {
    currentInputValue,
    newInput,
    currentSelectValue,
    newSelectValue,
  }
}

function handleInput(input) {
  const selectedMode = document.getElementById("mode_selection").value;

  let select;

  switch (selectedMode) {
    case "currency":
      select = currencies;
      break;
      
    case "temperature":
      select = temperatures;
      break;
        
    case "length":
      console.log("Comprimento");
      break;
  }

  if (isNaN(input_element_1.value)) {
    input_element_1.value = "";
    return;
  }
  
  if (isNaN(input_element_2.value)) {
    input_element_2.value = "";
    return;
  }
  
  const {
    currentInputValue,
    newInput,
    currentSelectValue,
    newSelectValue,
  } = getValues(input)
  
  if (currentSelectValue === newSelectValue) {
    newInput.value = currentInputValue;
    return;
  }

  const converter = select.find(item => item.value === currentSelectValue);

  const functionToConverter = converter.calc[newSelectValue];

  console.log(functionToConverter)

  const newValue = functionToConverter(currentInputValue);

  newInput.value = newValue;
}