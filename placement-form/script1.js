

const url1 = "https://script.google.com/macros/s/AKfycbzjnyO4Lh1XagCEJyyO8Ok4kNQ3BKHbbdsRPkxz8pWQBMzGX-SiPV22Z-YDCQS80hQwng/exec" 
fetch(`${url1}?header=Remaining Candidates`)
    .then((response) => response.json())
    .then(({ data }) => {
        console.log(data);
        populateDatalists("Name", data)
    })
    .catch((error) => (window.location = window.location.href));
    

const populateDatalists = (id, arr) => {
    let result = '';
    for (const item of arr) {
        result += `<option value="${item}">${item}</option>`;
    }
    console.log(result);
    document.getElementById(id).innerHTML += result;
    document.getElementById("load").style.display="none"; 
}

