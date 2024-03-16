// ARRAY GENERATION AREA
const resultDisplay = document.querySelector('#result-display')
const errorMessage = document.querySelector('#error-message')
let inputParameters = {}

function arrayGenerate() {
  const keepValues = document.querySelector('#keep-values')
  const brackets = document.querySelector('#brackets')
  const arraySortMode = document.getElementsByName('sort-method')
  let loopInit = document.querySelector('#loop-init')
  let loopEnd = document.querySelector('#loop-end')
  let loopStep = document.querySelector('#loop-step')
  
  errorMessage.style.backgroundColor = 'white'
  
  errorMessage.innerHTML = ''
  if(!loopInit.value || !loopEnd.value || !loopStep.value) {
    errorMessage.innerHTML = "Complete all fields first."
    errorMessage.style.backgroundColor = 'rgb(255, 153, 153)'
    return 1
  }
  if(Number(loopInit.value) > Number(loopEnd.value)) {
    errorMessage.innerHTML = "The initial value can not be greater than the final value."
    errorMessage.style.backgroundColor = 'rgb(255, 153, 153)'
    return 1
  }

  inputParameters.dataType = 'array'
  inputParameters.start = Number(loopInit.value)
  inputParameters.end = Number(loopEnd.value)
  inputParameters.step = Number(loopStep.value)
  inputParameters.brackets = brackets.checked
  for (let i = 0; i < arraySortMode.length; i++) {
    if (arraySortMode[i].checked) {
      inputParameters.method = arraySortMode[i].value
      console.log(inputParameters.method)
      break
    }
  }
  
  resultDisplay.innerHTML = `${inputParameters.brackets === true ? '[' : ''}`
  resultDisplay.innerHTML += partialArray(inputParameters.start, inputParameters.end, inputParameters.step, inputParameters.brackets)
  resultDisplay.innerHTML += `${inputParameters.brackets === true ? ']' : ''}`

  loopInit.focus()
  document.getElementById('visor-more-button').style.display = 'block'
  if(!(keepValues.checked)) {
    loopInit.value = ''
    loopEnd.value = ''
    loopStep.value = ''
  }
}

function partialArray(start, end, step, brackets) {
  let limitTracker = 0
  let array = []
  
  if(inputParameters.method === 'ascending') {
    const maxLengthDisplay = 13 - (start.toString().length)

    for(let i = start; i <= end; i += step) {
      if(limitTracker >= maxLengthDisplay && brackets === false) { // Add an ellipsis at the end if the number of numbers exceeds the "maxLength"
        array.push('...')
        break
      }
  
      array.push(i)
      limitTracker++
    
      if(limitTracker === maxLengthDisplay && brackets === true && i + step >= end + 1) {
        break
      } else if(limitTracker + 1 > maxLengthDisplay && brackets === true) { // Add an ellipsis at the end if the number of numbers exceeds the "maxLength"
        array.push('...')
        break
      }
    }

    return array.join(', ')
  } else if(inputParameters.method === 'descending') {
    const maxLengthDisplay = 13 - (end.toString().length)

    for(let i = end; i >= start; i -= step) {
      if(limitTracker >= maxLengthDisplay && brackets === false) {
        array.push('...')
        break
      }
      array.push(i)
      limitTracker++
    
      if(limitTracker === maxLengthDisplay && brackets === true && i + step >= end + 1) {
        break
      } else if(limitTracker + 1 > maxLengthDisplay && brackets === true) {
        array.push('...')
        break
      }
    }

    return array.join(', ')
  } else if(inputParameters.method === 'single-value') {
    const maxLengthDisplay = 13 - (start.toString().length)

    for(let i = start; i <= end; i += step) {
      if(limitTracker >= maxLengthDisplay && brackets === false) {
        array.push('...')
        break
      }
  
      array.push(0)
      limitTracker++
    
      if(limitTracker === maxLengthDisplay && brackets === true && i + step >= end + 1) {
        break
      } else if(limitTracker + 1 > maxLengthDisplay && brackets === true) {
        array.push('...')
        break
      }
    }

    return array.join(', ')
  } else {
    const maxLengthDisplay = 13 - (end.toString().length)

    for(let i = start; i <= end; i += step) {
      if(limitTracker >= maxLengthDisplay && brackets === false) {
        array = shuffleArray(array)
        array.push('...')
        return array.join(', ')
      }
      
      array.push(i)
      limitTracker++
    
      if(limitTracker === maxLengthDisplay && brackets === true && i + step >= end + 1) {
        array = shuffleArray(array)
        return array.join(', ')
      } else if(limitTracker + 1 > maxLengthDisplay && brackets === true) {
        array = shuffleArray(array)
        array.push('...')
        return array.join(', ')
      }
    }

    array = shuffleArray(array)
    return array.join(', ')
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

//  MATRIX GENERATION AREA
function matrixGenerate() {
  // const customMatrixCheck = document.querySelector('#custom-matrix-check')
  // const customMatrixInput = document.querySelector('#custom-matrix-value')
  const height = document.querySelector('#height')
  const width = document.querySelector('#width')
  const matrixSortMode = document.getElementsByName('sort-method')

  errorMessage.style.backgroundColor = 'white'
  
  errorMessage.innerHTML = ''
  if(!height.value || !width.value) {
    errorMessage.innerHTML = "Complete all fields first."
    errorMessage.style.backgroundColor = 'rgb(255, 153, 153)'
    return 1
  }
  if(Number(height.value) < 0 || Number(width.value) < 0) {
    errorMessage.innerHTML = "Measurements of the matrix cannot be less than '0'."
    errorMessage.style.backgroundColor = 'rgb(255, 153, 153)'
    return 1
  }

  inputParameters.dataType = 'matrix'
  inputParameters.start = Number(height.value)
  inputParameters.end = Number(width.value)
  for (let i = 0; i < matrixSortMode.length; i++) {
    if (matrixSortMode[i].checked) {
      inputParameters.method = matrixSortMode[i].value
      break
    }
  }
  /*
  if(customMatrixCheck.checked) {
    inputParameters.matrixInput = customMatrixInput.value
  }
  */
  
  revealFullResult()
  document.getElementById('visor-more-button').style.display = 'none'
}

// REVEAL RESULT AREA
function revealFullResult() {
  if(inputParameters.dataType === 'array') {
    let array = []

    if(inputParameters.method === 'ascending') {
      for(let i = inputParameters.start; i <= inputParameters.end; i += inputParameters.step) {
        array.push(i)
      }
    } else if(inputParameters.method === 'descending') {
      for(let i = inputParameters.end; i >= inputParameters.start; i -= inputParameters.step) {
        array.push(i)
      }
    } else if(inputParameters.method === 'single-value') {
      for(let i = 0; i <= (inputParameters.end - inputParameters.start) / inputParameters.step; i++) {
        array.push(0)
      }
    } else {
      for(let i = inputParameters.start; i <= inputParameters.end; i += inputParameters.step) {
        array.push(i)
      }
      array = shuffleArray(array)
    }

    resultDisplay.innerHTML = `${inputParameters.brackets === true ? '[' : ''}`
    resultDisplay.innerHTML += array.join(', ')
    resultDisplay.innerHTML += `${inputParameters.brackets === true ? ']' : ''}`
  } else if(inputParameters.dataType === 'matrix') {
    const valuesControl = inputParameters.end
    let matrix = new Set()
    let aux = []
    
    if(inputParameters.method === 'ascending') {
      let count = 0

      for(let i = 0; i < inputParameters.start; i++) {
        for(let j = count; j < inputParameters.end; j++) {
          aux.push(j)
          count = j
        }

        inputParameters.end += valuesControl
        count++
        matrix.add(aux)
        aux = []
      }
    } else if(inputParameters.method === 'descending') {
      let count = (inputParameters.start * inputParameters.end) - 1

      for(let i = 0; i < inputParameters.start; i++) {
        for(let j = 0; j < valuesControl; j++) {
          aux.push(count)
          count--
        }

        matrix.add(aux)
        aux = []
      }
    } else if(inputParameters.method === 'single-value') {
      for(let i = 0; i < inputParameters.start; i++) {
        for(let j = 0; j < inputParameters.end; j++) {
          aux.push(0)
        }

        matrix.add(aux)
        aux = []
      }
    } else {
      let scrambledArray = []
      for(let i = 0; i < inputParameters.start * inputParameters.end; i++) {
        scrambledArray.push(i)
      }
      scrambledArray = shuffleArray(scrambledArray)

      for(let i = 0; i <= scrambledArray.length; i++) {
        if(aux.length === inputParameters.end) {
          matrix.add(aux)
          aux = []
          aux.push(scrambledArray[i])
        } else {
          aux.push(scrambledArray[i])
        }
      }
    }

    resultDisplay.innerHTML = '['
    for(let i = 0; i < inputParameters.start; i++) {
      resultDisplay.innerHTML += `${i + 1 === inputParameters.start ? `[${Array.from(matrix)[i].join(',  ')}]` : `[${Array.from(matrix)[i].join(',  ')}], `}`
    }
    resultDisplay.innerHTML += ']'
  }

  document.getElementById('visor-more-button').style.display = 'none'
}

// COPY AREA
function copyValue() {
  navigator.clipboard.writeText(resultDisplay.innerText)
  .then(() => alert('Array copied to clipboard!'))
  .catch(err => console.error('Error copying array: ', err))
}