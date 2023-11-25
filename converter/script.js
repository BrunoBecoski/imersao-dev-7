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
  }
]

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
      console.log("Temperatura");
      break;
        
    case "length":
      console.log("Comprimento");
      break;
      
    default:  "currency"
      fillSelects(currencies);
  }
}

function fillSelects(items) { 
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
    const option = document.createElement("option")
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
      currentInputValue = isNaN(input_element_1.value) ? 1 : Number(input_element_1.value);
      currentSelectValue = select_element_1.value;
      newSelectValue = select_element_2.value;    
      break;
      
    case 'input_2':
    case 'select_2':
      currentInputValue = isNaN(input_element_2.value) ? 1 : Number(input_element_2.value);
      currentSelectValue = select_element_2.value;
      newSelectValue = select_element_1.value;
      break;
  }

  return {
    currentInputValue,
    currentSelectValue,
    newSelectValue,
  }
}

function handleInput(input) {
  const {
    currentInputValue,
    currentSelectValue,
    newSelectValue,
  } = getValues(input)

  console.log('=-=-=-=-=-=-=-=-=-=-=')
  console.log("Input atual: " + currentInputValue);
  console.log("Select atual: " + currentSelectValue);
  console.log("Select novo: " + newSelectValue);
}

function handleSelect(select) {
  const {
    currentInputValue,
    currentSelectValue,
    newSelectValue,
  } = getValues(select)

  console.log('=-=-=-=-=-=-=-=-=-=-=')
  console.log("Input atual: " + currentInputValue);
  console.log("Select atual: " + currentSelectValue);
  console.log("Select novo: " + newSelectValue);
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