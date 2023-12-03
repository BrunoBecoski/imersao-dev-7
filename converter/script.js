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
      'brl': (value) => value * 0.014,
      'cny': (value) => value * 0.020,
      'eur': (value) => value * 0.0026,
      'usd': (value) => value * 0.0028,
    },
  },
  {
    value: 'brl',
    name: 'Real brasileiro',
    calc: {
      'ars': (value) => value * 0.014,
      'cny': (value) => value * 0.68,
      'eur': (value) => value * 5.36,
      'usd': (value) => value * 4.91,
    },
  },
  {
    value: 'cny',
    name: 'Yuan chinês',
    calc: {
      'ars': (value) => value * 48.78,
      'brl': (value) => value * 0.68,
      'eur': (value) => value * 0.13,
      'usd': (value) => value * 0.14,
    },
  },
  {
    value: 'eur',
    name: 'Euro',
    calc: {
      'ars': (value) => value * 0.0026,
      'brl': (value) => value * 0.19,
      'cny': (value) => value * 0.13,
      'usd': (value) => value * 0.92,
    },
  },
  {
    value: 'usd',
    name: 'Dólar americano',
    calc: {
      'ars': (value) => value * 0.0028,
      'brl': (value) => value * 0.20,
      'cny': (value) => value * 0.14,
      'eur': (value) => value * 1.09,
    },
  },
];

const temperatures = [
  {
    value: 'celsius',
    name: 'Grau Celsius',
    calc: {
      'fahrenheit': (value) => (value * 9 / 5) + 32,
      'kelvin': (value) => value + 273.15,
    },    
  },
  {
    value: 'fahrenheit',
    name: 'Grau Fahrenheit',
    calc: {
      'celsius': (value) => (value - 32) * 5 / 9,
      'kelvin': (value) => (value - 32) * 5 / 9 + 273.15,
    },
  },
  {
    value: 'kelvin',
    name: 'Kelvin',
    calc: {
      'celsius': (value) => value - 273.15,
      'fahrenheit': (value) => (value - 273.15) * 9 / 5 + 32,
    },
  },
];

const lengths = [
  {
    value: 'millimeter',
    name: 'Milímetros',
    calc: {
      'centimeter': (value) => (value / 10),
      'meter': (value) => (value / 1000),
      'kilometer': (value) => (value / 1e+6),
      'inch': (value) => (value / 25.4),
      'foot': (value) => (value / 304.8),
      'mile': (value) => (value / 1.609e+6),
    },
  },
  {
    value: 'centimeter',
    name: 'Centímetros',
    calc: {
      'millimeter': (value) => value * 10,
      'meter': (value) => value / 100,
      'kilometer': (value) => value / 100000,
      'inch': (value) => value / 2.54,
      'foot': (value) => value / 30.48,
      'mile': (value) => value / 160900,
    }
  },
  {
    value: 'meter',
    name: 'Metros',
    calc: {
      'millimeter': (value) => value * 1000,
      'centimeter': (value) => value * 100,
      'kilometer': (value) => value / 1000,
      'inch': (value) => value * 39.37,
      'foot': (value) => value * 3.281,
      'mile': (value) => value / 1609,
    }
  },
  {
    value: 'kilometer',
    name: 'Quilômetros',
    calc: {
      'millimeter': (value) => value * 1e+6,
      'centimeter': (value) => value * 100000,
      'meter': (value) => value * 1000,
      'inch': (value) => value * 39370,
      'foot': (value) => value * 3281,
      'mile': (value) => value / 1.609,
    }
  },
  {
    value: 'foot',
    name: 'Pes',
    calc: {
      'millimeter': (value) => value * 304.8,
      'centimeter': (value) => value * 30.48,
      'meter': (value) => value / 3.281,
      'kilometer': (value) => value / 3281,
      'inch': (value) => value * 12,
      'mile': (value) => value / 5280,
    }
  },
  {
    value: 'inch',
    name: 'Polegadas',
    calc: {
      'millimeter': (value) => value * 25.4,
      'centimeter': (value) => value * 2.54,
      'meter': (value) => value / 39.37,
      'kilometer': (value) => value / 39370,
      'foot': (value) => value / 12,
      'mile': (value) => value / 63360,
    }
  },
  {
    value: 'mile',
    name: 'Milhas',
    calc: {
      'millimeter': (value) => value *  1.609e+6,
      'centimeter': (value) => value * 160900,
      'meter': (value) => value * 1609,
      'kilometer': (value) => value * 1.609,
      'inch': (value) => value * 63360,
      'foot': (value) => value * 5280,
    }
  }
];

const times = [
  {
    value: 'second',
    name: 'Segundos',
    calc: {
      'minute': (value) => value / 60,
      'hour': (value) => value / 3600,
      'day': (value) => value / 86400,
      'week': (value) => value / 604800,
      'month': (value) => value / 2.628e+6,
      'year': (value) => value / 3.154e+7,
      'decade': (value) => value / 3.154e+8,
      'century': (value) => value / 3.154e+9,
    }
  },
  {
    value: 'minute',
    name: 'Minutos',
    calc: {
      'second': (value) => value * 60,
      'hour': (value) => value / 60,
      'day': (value) => value / 1440,
      'week': (value) => value / 10080,
      'month': (value) => value / 43800,
      'year': (value) => value / 525600,
      'decade': (value) => value / 5.256e+6,
      'century': (value) => value / 5.256e+7,
    }
  },
  {
    value: 'hour',
    name: 'Horas',
    calc: {
      'second': (value) => value * 3600, 
      'minute': (value) => value * 60,
      'day': (value) => value / 24,
      'week': (value) => value / 168,
      'month': (value) => value / 730,
      'year': (value) => value / 8760,
      'decade': (value) => value / 87600,
      'century': (value) => value / 876000,
    }
  },
  {
    value: 'day',
    name: 'Dias',
    calc: {
      'second': (value) => value * 86400,
      'minute': (value) => value * 1440,
      'hour': (value) => value * 24,
      'week': (value) => value / 7,
      'month': (value) => value / 30.417,
      'year': (value) => value / 365,
      'decade': (value) => value / 3650,
      'century': (value) => value / 36500,
    }
  },
  {
    value: 'week',
    name: 'Semanas',
    calc: {
      'second': (value) => value * 604800,
      'minute': (value) => value * 10080,
      'hour': (value) => value * 168,
      'day': (value) => value * 7,
      'month': (value) => value / 4.345,
      'year': (value) => value / 52.143,
      'decade': (value) => value / 521.4,
      'century': (value) => value / 5214,
    }
  },
  {
    value: 'month',
    name: 'Meses',
    calc: {
      'second': (value) => value * 2.628e+6,
      'minute': (value) => value * 43800,
      'hour': (value) => value * 730,
      'day': (value) => value * 30.417,
      'week': (value) => value * 4.345,
      'year': (value) => value / 12,
      'decade': (value) => value / 120,
      'century': (value) => value / 1200,
    }
  },
  {
    value: 'year',
    name: 'Anos',
    calc: {
      'second': (value) => value * 3.154e+7,
      'minute': (value) => value * 525600,
      'hour': (value) => value * 8760,
      'day': (value) => value * 365,
      'week': (value) => value * 52.143,
      'month': (value) => value * 12,
      'decade': (value) => value / 10,
      'century': (value) => value / 100,
    }
  },
  {
    value: 'decade',
    name: 'Décadas',
    calc: {
      'second': (value) => value * 3.154e+8,
      'minute': (value) => value * 5.256e+6,
      'hour': (value) => value * 87600,
      'day': (value) => value * 3650,
      'week': (value) => value * 521.4,
      'month': (value) => value * 120,
      'year': (value) => value * 10,
      'century': (value) => value / 10,
    }
  },
  {
    value: 'century',
    name: 'Séculos',
    calc: {
      'second': (value) => value * 3.154e+9,
      'minute': (value) => value * 5.256e+7,
      'hour': (value) => value * 876000,
      'day': (value) => value * 36500,
      'week': (value) => value * 5214,
      'month': (value) => value * 1200,
      'year': (value) => value * 100,
      'decade': (value) => value * 10 ,
    }
  },
]

let select_element_1 = document.getElementById("select_1");
let select_element_2 = document.getElementById("select_2");

let input_element_1 = document.getElementById("input_1");
let input_element_2 = document.getElementById("input_2");

let selectedMode;
let selected;

handleSelectMode();

function handleSelectMode() {
  selectedMode = document.getElementById("mode_selection").value;

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
      selected = lengths;
      break;

    case "time":
      fillSelects(times);
      selected = times;
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
    case 'select_2':
      currentInputValue = input_element_1.value;
      newInput = input_element_2;
      currentSelectValue = select_element_1.value;
      newSelectValue = select_element_2.value;    
      break;
        
    case 'input_2':
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
  const converterValue = converter.calc[newSelectValue];

  const convertedValue = converterValue(currentInputValue);

  const formattedValue = formatValue(convertedValue);

  newInput.value = formattedValue;
}

function formatValue(value) {
  switch (selectedMode) {
    case 'currency':
    case 'temperature':
      return value.toFixed(2);

    case 'length':
    case 'time': 
      return value.toFixed(5).replace(/\.?0+$/, '')

    default:
      return value;
  }
}