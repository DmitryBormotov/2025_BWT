function verify() {
    let x = parseFloat(elementNum.value);

    if (x < 62) {
        result = x**2+4+5;
    }  else {
        result = 1/(x**2) + 4a + 5;
    }

    document.getElementById("result").value = result;
}

let result;

const elementNum = document.getElementById("num");
const elementVerify = document.getElementById("verify");
elementVerify.addEventListener('click', verify);
