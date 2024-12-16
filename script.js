const arrayContainer = document.getElementById('arrayContainer');
const generateArrayBtn = document.getElementById('generateArray');
const bubbleSortBtn = document.getElementById('bubbleSort');
const selectionSortBtn = document.getElementById('selectionSort');
const insertionSortBtn = document.getElementById('insertionSort');
const mergeSortBtn = document.getElementById('mergeSort');
const quickSortBtn = document.getElementById('quickSort');
const heapSortBtn = document.getElementById('heapSort');
const arraySizeInput = document.getElementById('arraySize');
const speedInput = document.getElementById('speed');

let array = [];
let speed = 50;

// Generate a systematic array with predictable values
function generateArray() {
  const size = parseInt(arraySizeInput.value);
  const step = Math.floor(300 / size); // Determine the step size for uniform bar heights
  array = Array.from({ length: size }, (_, index) => (index + 1) * step); // Systematic values
  shuffleArray(array);
  renderArray();
}
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
  }

// Render the array with numbers on bars
function renderArray() {
  arrayContainer.innerHTML = '';
  array.forEach(height => {
    const barContainer = document.createElement('div');
    barContainer.classList.add('bar-container');
    
    // Create the number label
    const number = document.createElement('div');
    number.classList.add('bar-number');
    number.textContent = height;
    
    // Create the bar
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${height}px`;
    bar.style.width = `${Math.floor(600 / array.length)}px`;
    
    // Add the number and bar to the container
    barContainer.appendChild(number);
    barContainer.appendChild(bar);
    arrayContainer.appendChild(barContainer);
  });
}


// Delay function for visualization
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
  const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = 'red';
      bars[j + 1].style.backgroundColor = 'red';

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }

      await delay(speed);
      bars[j].style.backgroundColor = '#45a29e';
      bars[j + 1].style.backgroundColor = '#45a29e';
    }
  }
}

// Selection Sort
async function selectionSort() {
  const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = 'red';

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = 'yellow';
      if (array[j] < array[minIndex]) {
        bars[minIndex].style.backgroundColor = '#45a29e';
        minIndex = j;
        bars[minIndex].style.backgroundColor = 'red';
      }
      await delay(speed);
      bars[j].style.backgroundColor = '#45a29e';
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIndex].style.height = `${array[minIndex]}px`;
    }
    bars[minIndex].style.backgroundColor = '#45a29e';
  }
}
// Quick Sort Algorithm
async function quickSort() {
    await quickSortHelper(0, array.length - 1);
    renderArray();
  }
  
  async function quickSortHelper(start, end) {
    if (start >= end) return;
  
    const pivotIndex = await partition(start, end);
    await quickSortHelper(start, pivotIndex - 1);
    await quickSortHelper(pivotIndex + 1, end);
  }
  
  async function partition(start, end) {
    const bars = document.querySelectorAll('.bar');
    const pivotValue = array[end];
    let pivotIndex = start;
  
    for (let i = start; i < end; i++) {
      if (array[i] < pivotValue) {
        [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
  
        // Swap the heights
        bars[i].style.height = `${array[i]}px`;
        bars[pivotIndex].style.height = `${array[pivotIndex]}px`;
  
        pivotIndex++;
      }
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    bars[pivotIndex].style.height = `${array[pivotIndex]}px`;
    bars[end].style.height = `${array[end]}px`;
  
    return pivotIndex;
  }

  // Merge Sort Algorithm
async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);
    renderArray();
  }
  
  async function mergeSortHelper(start, end) {
    if (start >= end) return;
  
    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);
    await merge(start, mid, end);
  }
  
  async function merge(start, mid, end) {
    const bars = document.querySelectorAll('.bar');
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);
  
    let i = 0, j = 0, k = start;
  
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        array[k] = left[i];
        bars[k].style.height = `${array[k]}px`;
        i++;
      } else {
        array[k] = right[j];
        bars[k].style.height = `${array[k]}px`;
        j++;
      }
      k++;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  
    while (i < left.length) {
      array[k] = left[i];
      bars[k].style.height = `${array[k]}px`;
      i++;
      k++;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  
    while (j < right.length) {
      array[k] = right[j];
      bars[k].style.height = `${array[k]}px`;
      j++;
      k++;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

// Add event listeners
generateArrayBtn.addEventListener('click', generateArray);
bubbleSortBtn.addEventListener('click', bubbleSort);
selectionSortBtn.addEventListener('click', selectionSort);
arraySizeInput.addEventListener('input', generateArray);
quickSortBtn.addEventListener('click', quickSort);
mergeSortBtn.addEventListener('click', mergeSort);
speedInput.addEventListener('input', () => (speed = 110 - speedInput.value));

// Initialize array
generateArray();
