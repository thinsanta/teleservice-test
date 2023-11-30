#!/usr/bin/env node

console.log( "Hello!" );

const fs = require('fs');
const readline = require('readline');

const filePath = 'car_orders.csv';


// Create an object to store the counts
const columnCounts = {};
let countsArray = []



const companySort = () =>{

    // Create a readline interface to read the file line by line
const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity, // Recognize both \r\n and \n as line endings
  });
  
  // Event listener for each line in the CSV file
  rl.on('line', (line) => {
    // Split the line into an array of values
    const row = line.split(';');
  
    // Access the value of the first column
    const firstColumnValue = row[0];
  
    // Check if the value exists in the counts object
    if (firstColumnValue in columnCounts) {
      // If it exists, increment the count
      columnCounts[firstColumnValue]++;
    } else {
      // If it doesn't exist, initialize the count to 1
      columnCounts[firstColumnValue] = 1;
    }
  });
  
  // Event listener for the end of the file
  rl.on('close', () => {
      // Convert the object to an array of key-value pairs
    const countsArray = Object.entries(columnCounts);
    const sortedArrayAscending = countsArray.slice().sort((a, b) => b[1] - a[1]);
    const newObj = {...sortedArrayAscending}
    console.table(sortedArrayAscending);
  });
  
  // Event listener for errors
  rl.on('error', (error) => {
    console.error('Error reading CSV file:', error.message);
  });
}

const carFirm = () =>{

        // Create a readline interface to read the file line by line
const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity, // Recognize both \r\n and \n as line endings
  });
  
  // Event listener for each line in the CSV file
  rl.on('line', (line) => {
    // Split the line into an array of values
    const row = line.split(';');
  
    // Access the value of the first column
    const firstColumnValue = row[2];
  
    // Check if the value exists in the counts object
    if (firstColumnValue in columnCounts) {
      // If it exists, increment the count
      columnCounts[firstColumnValue]++;
    } else {
      // If it doesn't exist, initialize the count to 1
      columnCounts[firstColumnValue] = 1;
    }
  });
  
  // Event listener for the end of the file
  rl.on('close', () => {
      // Convert the object to an array of key-value pairs
    const countsArray = Object.entries(columnCounts);
    const sortedArrayAscending = countsArray.slice().sort((a, b) => b[1] - a[1]);
    const newObj = {...sortedArrayAscending}
    console.table(sortedArrayAscending);
  });
  
  // Event listener for errors
  rl.on('error', (error) => {
    console.error('Error reading CSV file:', error.message);
  });

}

const popularCarByFirm = () =>{
            // Create a readline interface to read the file line by line
const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity, // Recognize both \r\n and \n as line endings
  });
  
  // Event listener for each line in the CSV file
  rl.on('line', (line) => {
    
    // Split the line into an array of values
    const row = line.split(';')
  
    // Access the value of the first column
    const firstColumnValue = row[0]
    const secondColumnValue = row[2]
    
    if(firstColumnValue in columnCounts){

        if(secondColumnValue in columnCounts[firstColumnValue]){
            //columnCounts[secondColumnValue]++
            //columnCounts[firstColumnValue][secondColumnValue]++
            columnCounts[firstColumnValue][secondColumnValue] = columnCounts[firstColumnValue][secondColumnValue]+1
            
        }
        else{
          columnCounts[firstColumnValue][secondColumnValue] = 1
          //columnCounts[firstColumnValue][secondColumnValue]++
            //columnCounts[firstColumnValue].push(secondColumnValue)
        }
    }
    else{
        
        columnCounts[firstColumnValue] = {[secondColumnValue] : 1}
        //columnCounts[firstColumnValue] = [secondColumnValue]
        //columnCounts[firstColumnValue][secondColumnValue] = 1
    }

    // Sort the array based on the values of the inner objects
    countsArray = Object.entries(columnCounts);
    countsArray.forEach((item) => {
    const innerObject = item[1];
    const objectArray = Object.entries(innerObject);
    objectArray.sort((a, b) => b[1] - a[1]);
    item[1] = Object.fromEntries(objectArray);
});



    
/////////////////////////////////////////////////////
      //const countsArray = Object.entries(columnCounts);
      //const sortedArrayAscending = countsArray.slice().sort((a, b) => b[1].firstColumnValue - a[1].firstColumnValue);
      //console.log(sortedArrayAscending)
      
    
    //columnCounts.car = secondColumnValue
    //console.log(columnCounts[firstColumnValue][secondColumnValue])
  
  });
  
  // Event listener for the end of the file
  rl.on('close', () => {
    console.log(countsArray);
    

  });
  
  // Event listener for errors
  rl.on('error', (error) => {
    console.error('Error reading CSV file:', error.message);
  });
}

//popularCarByFirm()
//carFirm()
companySort()