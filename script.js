import fetch from 'node-fetch'

//get data with fetch
const getData = async () => {
    try {
        const response = await fetch('https://one00x-data-analysis.onrender.com/assignment?email=bprathamesh2003@gmail.com')
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

let recivedData = null

getData().then(data => {
    if (data) {
        recivedData = data;
    }
    const finalData = processData(recivedData)
    let result = {
        assignment_id: "95c3f50d-8253-45cf-9820-a84ed60de6ec",
        answer: finalData[0]
    }
    sendData(result)
});



const processData = (arr) => {
    const stringCounts = new Map();

    // Count occurrences of each string
    arr.forEach((str) => {
        const count = (stringCounts.get(str) || 0) + 1;
        stringCounts.set(str, count);
    });

    // Find the maximum count
    let maxCount = 0;
    stringCounts.forEach((count) => {
        if (count > maxCount) {
            maxCount = count;
        }
    });
    
    // Chose this approach 
    // Find the most occurring strings
    const mostOccurringStrings = [];
    stringCounts.forEach((count, str) => {
        if (count === maxCount) {
            mostOccurringStrings.push(str);
        }
    });

    console.log(mostOccurringStrings)
    return mostOccurringStrings;

}


const sendData = (result) => {
    fetch('https://one00x-data-analysis.onrender.com/assignment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}






