import someJson from './normalozedJson.json';
const targetDiv = document.querySelector('#anchor');
let resultString = '';
let tableFormatted = '';

// console.log(someJson);
someJson.map(r => {
  displayInterested(r);
  saveToText(r);
});

targetDiv.insertAdjacentHTML('afterbegin', resultString);

function displayInterested(obj) {
  const target = obj.M2slots;
  const size = obj.Formfactor;
  if (target.includes('PCIe')) {
    if (size.includes('Small')) {
      return (resultString += `<li>
      <span class="first">${obj.Released}</span>
      <span class="first">${obj.Chipset}</span>
      <span class="yellow second">${obj.model}</span>
      <span class="ramspec">(${obj.RAMslots}/${obj.RAMspeed}/${obj.RAMmax})</span>
      <span class="third">${obj.RAM}</span>
      <span class="third">${obj.CPUoptions}</span>
      <span>slots:${obj.M2slots}</span>
      </li>`);
    }
  } else {
  }
  // console.log(obj.M2slots);
}

function saveToText(obj) {
  const target = obj.M2slots;
  const size = obj.Formfactor;
  if (target.includes('PCIe')) {
    if (size.includes('Micro')) {
      return (tableFormatted += `
      <${obj.Released}<${obj.Chipset}<${obj.model}<${obj.RAMslots}/${obj.RAMspeed}/${obj.RAMmax}<${obj.RAM}<${obj.CPUoptions}<${obj.M2slots} 
    `);
    }
  }
}

const buttonAnchor = document.querySelector('#go');
const buttonStart = document.querySelector('#start');
const buttonSave = document.querySelector('#save');
buttonAnchor.addEventListener('click', buttonHandler);
buttonStart.addEventListener('click', buttonStartHandler);
buttonSave.addEventListener('click', writeFile);

let globalCollection = {};

async function writeFile() {
  const fileHandle = await window.showSaveFilePicker();
  const writable = await fileHandle.createWritable();
  await writable.write(tableFormatted);
  await writable.close();
  console.log('File saved.');
}

function buttonStartHandler() {
  //   console.log(pclist);
  iterateJson(pclist);
}

function buttonHandler(event) {
  console.log(tableFormatted);
}

function iterateJson(arrayPcs) {}
