const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('confirmPassword');

// Show input error message
function showError(input,message){
    const formControl  = input.parentElement;
    formControl.className="form-control error";
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className= "form-control success";
}

function checkEmail(input){
    let re = /^(([^<>()[\]{}'^?\\.,!|//#%*-+=&;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if(re.test(input.value.trim())){
        showSuccess(input);
    }
    else {
       showError(input,'Please enter a valid Email');
    }
}

function checkPasswordsMatch(input1,input2){
  
    if(input1.value.trim() !== input2.value.trim()){
        showError(input2, "Password must match");
    }
    else if(input2.value.trim() === ''){
        showError(input2, "Please enter password and confirm password");
    }
    else {
        showSuccess(input2);
    }
}

//check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
       if(input.value.trim() === ''){
           showError(input,`${getFieldName(input)} is Required`);
       }
       else {
           showSuccess(input);
       }
    });
}

function checkLength(input,min,max) {
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least 6 characters`);
    }
    else if(input.value.length > max){
        showError(input,`${getFieldName(input)} must not be more than 15 characters`);
    }
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listeners
form.addEventListener('submit', function(e) {
   e.preventDefault();
   checkRequired([username,email,password,password2]);
   checkLength(username,3,15);
   checkLength(password,6,15);
   checkEmail(email);
   checkPasswordsMatch(password,password2);

});