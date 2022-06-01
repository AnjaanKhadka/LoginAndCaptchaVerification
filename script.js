var c = document.getElementById("CaptchaCanvas");
var ctx = c.getContext("2d");
var cpt;

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

//Function to display feedback text
function WriteFeedback(Message){
    var feedback = document.getElementById("FeedbackText");
    feedback.textContent = Message;
}

function CheckCharacters(pass){
    var isLcase = 0;
    var isUcase = 0;
    var isNum = 0;
    var isSchar = 0;
    var i = pass.length;
    while (i--) {
        ch = pass.charCodeAt(i);
        if(ch>=32 && ch<=126){
            if(ch>=48 && ch<=57){
                isNum = 1;
            }
            else if(ch>=65 && ch<=90){
                isUcase = 1;
            }
            else if(ch>=97 && ch<=122){
                isLcase = 1;
            }
            else{            
                isSchar = 1;
            }
        }         
    }
    if(!isLcase){
        WriteFeedback("Your password needs to include Lowercase Letters");
        return false;
    }
    if(!isUcase){
        WriteFeedback("Your password needs to include Uppercase Letters");
        return false;
    }
    if(!isNum){
        WriteFeedback("Your password needs to atleast one number");
        return false;
    }
    if(!isSchar){
        WriteFeedback("Your password needs to include special characters");
        return false;
    }
    return true
}

//Algorithmic way of checking weak password.
function CheckPassword(){
    psw = document.getElementById("PasswordID").value;
    psw2 = document.getElementById("PasswordID2").value;
    if (psw!=psw2){
        WriteFeedback("Passwords do not match !!");
        return false;
    }
    if (psw.length < 8){
        WriteFeedback("Password should be atleast 8 characters long");
        return false;
    }
    if(!CheckCharacters(psw)){
        return false;
    }

    WriteFeedback("This is Working");
    // console.log(psw);
    return true;
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