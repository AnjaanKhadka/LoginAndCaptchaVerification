var c = document.getElementById("CaptchaCanvas");
var ctx = c.getContext("2d");
var cpt;

var isLen = false;
var isUcase = false;
var isLcase = false;
var isNum = false;
var isSchar = false;

function StartUp(){

    //Initiating with Null feedback text
    WriteFeedback("");

    color = ctx.getImageData(1,100,1,1).data; 
    refillCanvas(); 
    CaptchaReload();
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

// Function to display feedback text
function WriteFeedback(Message){
    var feedback = document.getElementById("FeedbackText");
    feedback.textContent = Message;
}

function UpdateRadio_tick(id){
    document.getElementById(id).classList.remove("CrossList");
    document.getElementById(id).classList.add("TickList");
}

function UpdateRadio_cross(id){
    document.getElementById(id).classList.remove("TickList");
    document.getElementById(id).classList.add("CrossList");
}

// function to update feedback list
function UpdateFeedback(){
    if (isLen) UpdateRadio_tick("LengthVerify");   
    else UpdateRadio_cross("LengthVerify");
        
    if (isLcase) UpdateRadio_tick("LowerVerify");   
    else UpdateRadio_cross("LowerVerify");

    if (isUcase) UpdateRadio_tick("UpperVerify");   
    else UpdateRadio_cross("UpperVerify");

    if (isNum) UpdateRadio_tick("NumVerify");   
    else UpdateRadio_cross("NumVerify");

    if (isSchar) UpdateRadio_tick("CharVerify");   
    else UpdateRadio_cross("CharVerify");

}


function CheckCharacters(pass){
    var isLcase2 = false;
    var isUcase2 = false;
    var isNum2 = false;
    var isSchar2 = false;
    var i = pass.length;
    var len = i;
    while (i--) {
        ch = pass.charCodeAt(i);
        if(ch>=32 && ch<=126){
            if(ch>=48 && ch<=57){
                isNum2 = true;
            }
            else if(ch>=65 && ch<=90){
                isUcase2 = true;
            }
            else if(ch>=97 && ch<=122){
                isLcase2 = true;
            }
            else{            
                isSchar2 = true;
            }
        }         
    }
    // if(!isLcase){
    //     WriteFeedback("Your password needs to include Lowercase Letters");
    //     return false;
    // }
    // if(!isUcase){
    //     WriteFeedback("Your password needs to include Uppercase Letters");
    //     return false;
    // }
    // if(!isNum){
    //     WriteFeedback("Your password needs to atleast one number");
    //     return false;
    // }
    // if(!isSchar){
    //     WriteFeedback("Your password needs to include special characters");
    //     return false;
    // }
    // return true

    var ret = true;
    if(len<8){
        isLen = false;
        ret = false;
    }
    else{
        isLen = true;
    }   
    if(!isLcase2){
        isLcase = false;
        ret = false;
    }
    else{
        isLcase = true;
    }
    if(!isUcase2){
        isUcase = false;
        ret = false;
    }
    else{
        isUcase = true;
    }
    if(!isNum2){
        isNum = false;
        ret = false;
    }
    else{
        isNum = true;
    }
    if(!isSchar2){
        isSchar = false;
        ret = false;
    }
    else{
        isSchar = true;
    }
    UpdateFeedback();
    return ret

}

//Algorithmic way of checking weak password.
function CheckPassword(){
    psw = document.getElementById("PasswordID").value;
    psw2 = document.getElementById("PasswordID2").value;
    var ret = true;
    if (psw!=psw2){
        WriteFeedback("Passwords do not match !!");
        ret = false;
    }
    else{
        WriteFeedback(" ")
    }
    // if (psw.length < 8){
    //     WriteFeedback("Password should be atleast 8 characters long");
    //     return false;
    // }
    if(!CheckCharacters(psw)){
        ret = false;
    }

    // WriteFeedback("This is Working");
    // console.log(psw);
    return ret;
}

function refillCanvas(){
    ctx.beginPath();
    ctx.rect(-10, -10,c.width+20,c.height+20);
    ctx.fillStyle = "rgb(241,241,241)";
    ctx.fill();
}

function randomm(a){
    return Math.floor(Math.random()*a);
}

function CaptchaReload(){
    ctx.lineWidth = 1;
    refillCanvas();
    ctx.fill();
    ctx.lineWidth = 1;

    for(i=0;i<5;i++){
        a = 10+randomm(c.width-20);
        b = 10+randomm(c.height-20);
        x = 10+randomm(c.width-20);
        y = 10+randomm(c.height-20);
        ctx.moveTo(a,b);
        ctx.lineTo(x,y);

    }

    ctx.strokeStyle = 'red'
    ctx.stroke();
   
    cpt = GenerateCaptcha();

    for(i=0;i<cpt.length;i++){
        ctx.font = "96px RM123";
        ctx.fillStyle = "red"
        ctx.fillText(cpt[i], 10+36*i, 60+randomm(60));
    }
    // WriteFeedback("")
}

function CaptchaCheck(){
    cpt_inp = document.getElementById("CaptchaBox").value;
    if(cpt.length === cpt_inp.length){
        for(i=0;i<cpt.length;i++){
            if(cpt_inp.charAt(i) != cpt[i]){
                return false
            }
        }
        return true;
    }
    return false;
}

function GenerateCaptcha(){
    const ChSet = "abdefghijklmnopqrtuvwyABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
    var cpt = []
    for (i=0;i<8;i++){
        cpt.push(ChSet.charAt(randomm(ChSet.length)))
    }
    // console.log(cpt)
    return cpt;
}


function SubmitBtnClick(){
    if (document.getElementById("UserName").value.length == 0){
        WriteFeedback("Invalid Name");
        return false;
    }
    if (!CheckPassword()){
        CaptchaReload();
        return false;
    }
    if (!CaptchaCheck()){
        WriteFeedback("Incorrect Captcha");
        // CaptchaReload()
        return false;
    }
    wait(3000)
    window.location.href = 'main.html'; 
}

function LoginPageLoad(){
    window.location.href = "Login.html";
}

function SignUpPageLoad(){
    window.location.href = "Signup.html";
}

function LoginVerification(){
    // Write your code for Login Verification 
    EmailID = document.getElementById("EmailID").value;
    password = document.getElementById("PasswordID").value;

    Verified = true
    //Your verification code here


    
    if (Verified){
        window.location.href = "main.html";
    }
    else{
        WriteFeedback("Your Email or Password is Incorrect");
    }
}

setInterval(function(){ 
    CheckPassword(); 
}, 2000);