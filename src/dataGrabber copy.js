let globalCollection = {};
import pclist from './mainPcList.json';
const buttonAnchor = document.querySelector('#go');
const buttonStart = document.querySelector('#start');
const buttonSave = document.querySelector('#save');
buttonAnchor.addEventListener('click', buttonHandler);
buttonStart.addEventListener('click', buttonStartHandler);
buttonSave.addEventListener('click', writeFile);

async function writeFile() {
  const fileHandle = await window.showSaveFilePicker();
  const writable = await fileHandle.createWritable();
  await writable.write(JSON.stringify(globalCollection));
  await writable.close();
  console.log('File saved.');
  console.log(globalCollection);
}

function buttonSaveHandler() {
  const fs = require('fs');

  // The variable you want to save
  const myVar = 'Hello World!';

  // Append the variable to the log file
  fs.appendFileSync('log.txt', myVar + '\n');
}

function buttonStartHandler() {
  //   console.log(pclist);
  iterateJson(pclist);
}

function buttonHandler(event) {
  console.log(globalCollection);
}

function iterateJson(arrayPcs) {
  const tempObj = {};
  const result = arrayPcs.map(r => {
    // console.log(r.value);
    let returnedData = collectObj(r.value);
  });
}

async function collectObj(queryString) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const targetUrl = `https://www.hardware-corner.net/desktop-models/${queryString}/`;
  const summaryQ = proxyUrl + targetUrl;
  // console.log(summaryQ);
  fetch(summaryQ)
    // fetch("data.html")
    .then(response => response.text())
    .then(html => {
      let parser = new DOMParser();
      let doc = parser.parseFromString(html, 'text/html');

      let tables = doc.getElementsByTagName('table');
      let data = {};
      let trigger = true;

      // console.log(tables);

      // for (let t = 0; t < tables.length; t++) {
      let currentObj = tables[0];
      let tableRows = currentObj.getElementsByTagName('tr');

      // console.log("here one table->", tableRows);
      for (let i = 0; i < tableRows.length; i++) {
        let row = tableRows.item(i);
        let rawText = row.textContent.replace(/\n\t+/g, '');
        if (rawText.includes('Form factor')) {
          //   console.log('-----------here is the proper row -------------');
          trigger = false;
        }
        if (trigger === false) {
          // console.log("here is row+++++++");
          let propKey = '';
          let propValue = '';
          for (let j = 0; j < row.children.length; j++) {
            let child = row.children[j];
            let clearChild = child.textContent.replace(/\n\t+/g, '');
            if (j === 0) {
              // console.log("here is propKey child", clearChild);
              propKey = clearChild;
            } else {
              // console.log("here is propValue child", clearChild);
              propValue = clearChild;
            }
          }
          data[propKey] = propValue;
        }
      }

      // console.log(data);
      // return data;
      // console.log(queryString);
      // console.log(globalCollection);
      console.log(`was processed: ${queryString}`);
      globalCollection[queryString] = data;
    });
}
