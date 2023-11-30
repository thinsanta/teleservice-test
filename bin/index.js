#!/usr/bin/env node
import fs from 'fs'
import readline from 'readline'
import yargs from 'yargs';

console.log( "Hello!" );


const filePath = 'car_orders.csv';
const {argv} = yargs(process.argv)

// Create an object to store the counts
const columnCounts = {};
let countsArray = []
let result = null

  // Create a readline interface to read the file line by line
  // And we create it globaly so we can access it from the functions
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

// Created a seperate  function for this part to minimize repeated code
const readCsvFile = async (colRow) =>{
  
  // Event listener for each line in the CSV file
  rl.on('line', (line) => {

    // Split the line when ; is met
    const row = line.split(';');
  
    // Access the value of the given column
    const firstColumnValue = row[colRow];
  
    // Check if the value exists in the counts object
    if (firstColumnValue in columnCounts) {
      // If it exists, increment the count
      columnCounts[firstColumnValue]++;
    } else {
      // If it doesn't exist, initialize the count to 1
      columnCounts[firstColumnValue] = 1;
    }
  });
  }



const companySort = async () =>{

  await readCsvFile(0)
  
  // Event listener for the end of the file
  rl.on('close', () => {
   // Conver object to array so we can sort
    const countsArray = Object.entries(columnCounts);
    const sortedArrayAscending = countsArray.slice().sort((a, b) => b[1] - a[1]);
    console.table(sortedArrayAscending);
  });
  
  // Event listener for errors
  rl.on('error', (error) => {
    console.error('Error reading CSV file:', error.message);
  });
}

const carFirm = () =>{

  readCsvFile(2)
  
  // Event listener for the end of the file
  rl.on('close', () => {

    // Conver object to array so we can sort
    const countsArray = Object.entries(columnCounts);
    const sortedArrayAscending = countsArray.slice().sort((a, b) => b[1] - a[1]);
    console.table(sortedArrayAscending);
    
  });
  
  // Event listener for errors
  rl.on('error', (error) => {
    console.error('Error reading CSV file:', error.message);
  });

}

function keepMostOccurredValues(data) {
  return Object.entries(data).map(([id, cars]) => {
    const mostOccurredBrand = Object.keys(cars).reduce((a, b) => (cars[a] > cars[b] ? a : b));

    const newObject = {
      [id]: {
        [mostOccurredBrand]: cars[mostOccurredBrand]
      }
    };

    return newObject;
  });
}

const popularCarByFirm = () =>{

  rl.on('line', (line) => {
    
    // Split the line when ; is met
    const row = line.split(';')
  
    // Access the value of the first column and the third column
    const firstColumnValue = row[0]
    const secondColumnValue = row[2]
    // Check if the id exists
    if(firstColumnValue in columnCounts){
      //Then we check if car exists
        if(secondColumnValue in columnCounts[firstColumnValue]){
          // If it exists then increment
          columnCounts[firstColumnValue][secondColumnValue] = columnCounts[firstColumnValue][secondColumnValue]+1
            
        }
        else{
          // If it doesn't exist, initialize the count to 1
          columnCounts[firstColumnValue][secondColumnValue] = 1

        }
    }
    else{
      // If id doesn't exist then add it
      columnCounts[firstColumnValue] = {[secondColumnValue] : 1}

    }
    result = keepMostOccurredValues(columnCounts);
  
});
  
  // Event listener for the end of the file
  rl.on('close', () => {
    //const obj = Object.fromEntries(countsArray)
    console.log(result);
    //console.dir(obj, { depth: null })

  });
  
  // Event listener for errors
  rl.on('error', (error) => {
    console.error('Error reading CSV file:', error.message);
  });
}


const switchState = (answer) =>{

  switch (answer) {
    case 'companies':
      companySort()
      break;
    
    case "car":
      carFirm()
      break;

    case "popular":
      popularCarByFirm()
      break;
  
    default:
      break;
  }
}

switchState(argv.answer)
