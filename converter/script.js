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
      'brl': (value) => (value * 0.014).toFixed(2),
      'cny': (value) => (value * 0.020).toFixed(2),
      'eur': (value) => (value * 0.0026).toFixed(2),
      'usd': (value) => (value * 0.0028).toFixed(2),
    },
  },
  {
    value: 'brl',
    name: 'Real brasileiro',
    calc: {
      'ars': (value) => (value * 0.014).toFixed(2),
      'cny': (value) => (value * 0.68).toFixed(2),
      'eur': (value) => (value * 5.36).toFixed(2),
      'usd': (value) => (value * 4.91).toFixed(2),
    },
  },
  {
    value: 'cny',
    name: 'Yuan chinês',
    calc: {
      'ars': (value) => (value * 48.78).toFixed(2),
      'brl': (value) => (value * 0.68).toFixed(2),
      'eur': (value) => (value * 0.13).toFixed(2),
      'usd': (value) => (value * 0.14).toFixed(2),
    },
  },
  {
    value: 'eur',
    name: 'Euro',
    calc: {
      'ars': (value) => (value * 0.0026).toFixed(2),
      'brl': (value) => (value * 0.19).toFixed(2),
      'cny': (value) => (value * 0.13).toFixed(2),
      'usd': (value) => (value * 0.92).toFixed(2),
    },
  },
  {
    value: 'usd',
    name: 'Dólar americano',
    calc: {
      'ars': (value) => (value * 0.0028).toFixed(2),
      'brl': (value) => (value * 0.20).toFixed(2),
      'cny': (value) => (value * 0.14).toFixed(2),
      'eur': (value) => (value * 1.09).toFixed(2),
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

const lengths = [
  {
    value: 'nm',
    name: 'Nanômetros',
    calc: {
      'mm': (value) => value,
      'cm': (value) => value,
      'm': (value) => value,
      'km': (value) => value,
      'mi': (value) => value,
      'yd': (value) => value,
      'ft': (value) => value,
      'in': (value) => value,
    }
  },
  {
    value: 'mm',
    name: 'Milímetros',
    calc: {
      'nm': (value) => value,
      'cm': (value) => value,
      'm': (value) => value,
      'km': (value) => value,
      'mi': (value) => value,
      'yd': (value) => value,
      'ft': (value) => value,
      'in': (value) => value,
    }
  },
  {
    value: 'cm',
    name: 'Centímetros',
    calc: {
      'nm': (value) => value,
      'mm': (value) => value,
      'm': (value) => value,
      'km': (value) => value,
      'mi': (value) => value,
      'yd': (value) => value,
      'ft': (value) => value,
      'in': (value) => value,
    }
  },
  {
    value: 'm',
    name: 'Metros',
    calc: {
      'nm': (value) => value,
      'mm': (value) => value,
      'cm': (value) => value,
      'km': (value) => value,
      'mi': (value) => value,
      'yd': (value) => value,
      'ft': (value) => value,
      'in': (value) => value,
    }
  },
  {
    value: 'km',
    name: 'Quilômetros',
    calc: {
      'nm': (value) => value,
      'mm': (value) => value,
      'cm': (value) => value,
      'm': (value) => value,
      'mi': (value) => value,
      'yd': (value) => value,
      'ft': (value) => value,
      'in': (value) => value,
    }
  },
  {
    value: 'mi',
    name: 'Milhas',
    calc: {
      'nm': (value) => value,
      'mm': (value) => value,
      'cm': (value) => value,
      'm': (value) => value,
      'km': (value) => value,
      'yd': (value) => value,
      'ft': (value) => value,
      'in': (value) => value,
    }
  },
  {
    value: 'yd',
    name: 'Jardas',
    calc: {
      'nm': (value) => value,
      'mm': (value) => value,
      'cm': (value) => value,
      'm': (value) => value,
      'km': (value) => value,
      'mi': (value) => value,
      'ft': (value) => value,
      'in': (value) => value,
    }
  },
  {
    value: 'ft',
    name: 'Pes',
    calc: {
      'nm': (value) => value,
      'mm': (value) => value,
      'cm': (value) => value,
      'm': (value) => value,
      'km': (value) => value,
      'mi': (value) => value,
      'yd': (value) => value,
      'in': (value) => value,
    }
  },
  {
    value: 'in',
    name: 'Polegadas',
    calc: {
      'nm': (value) => value,
      'mm': (value) => value,
      'cm': (value) => value,
      'm': (value) => value,
      'km': (value) => value,
      'mi': (value) => value,
      'yd': (value) => value,
      'ft': (value) => value,
    }
  },
];

let select_element_1 = document.getElementById("select_1");
let select_element_2 = document.getElementById("select_2");

let input_element_1 = document.getElementById("input_1");
let input_element_2 = document.getElementById("input_2");

let selected;

handleSelectMode();

function handleSelectMode() {
  const selectedMode = document.getElementById("mode_selection").value;

  switch (selectedMode) {
    case "currency":
      fillSelects(currencies);
      selected = currencies;
      break;
      
    case "temperature":
      fillSelects(temperatures);
      selected = temperatures;
      break;
        
    case "length":
      fillSelects(lengths);
      selected = length;
      break;
      
    default:  "currency"
      fillSelects(currencies);
      selected = currencies;
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

  const converter = selected.find(item => item.value === currentSelectValue);

  const functionToConverter = converter.calc[newSelectValue];

  const newValue = functionToConverter(currentInputValue);

  newInput.value = newValue;
}