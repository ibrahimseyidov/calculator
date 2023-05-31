$(document).ready(() => {
    let myInput = $(".main-result");
    $(myInput).val("0")
    let firstNum = "";
    let secondNum = "";
    let operator = null;
    let activation = false;
    let result = null;
    let activate = false;

    $(".button-container").click((e) => {
        let element = e.target
        if (element.className == "number") {
            if (activation && secondNum.length < 16) {
                console.log(element.value);
                secondNum += element.value
                console.log(secondNum);
                showAllUI()
            } else if (firstNum.length < 16 && secondNum.length == "") {
                firstNum += element.value;
                console.log(element.value);
                showUI()
                activation = false
            }

        } else if (element.className == "operator") {
            if (firstNum != "" && !firstNum.includes("+") && !firstNum.slice(1).includes("-") && !firstNum.includes("×") && !firstNum.includes("÷")) {
                firstNum += element.value;
                operator = element.value;
                showUI()
                activation = true;
            }


        } else if (element.className == "decimal") {
            if (!firstNum.includes(".") && !($(myInput).val() == "0")) {
                firstNum += "."
                showUI(firstNum)
            } else if ($(myInput).val() == "0") {
                firstNum += "0."
                showUI()
            } else if (!secondNum.includes(".")) {
                if (activation) {
                    secondNum += "."
                    showAllUI()
                }
            }
        } else if (element.className == "clear") {
            clearInput()
        } else if (element.className == "equal") {
            showEqual()
        } else if (element.className == "divide") {
            if (firstNum != "") {
                result = parseFloat(firstNum) / 100
                $(myInput).val(result)
                return
            } else if (secondNum != "") {
                result = parseFloat(secondNum) / 100
                $(myInput).val(result)
                return
            } else {
                result = result / 100
                $(myInput).val(result)
                return
            }
        } else if (element.className == "plusMinus") {
            if (firstNum != "" && !operator) {
                firstNum = ((parseFloat(firstNum) * -1).toString())
                showUI()
            } else if (secondNum && operator) {
                secondNum = ((parseFloat(secondNum) * -1).toString())
                showAllUI()
            }
        } else if (element.className == "delBtn") {
            delLastChar()
        }

    })

    function delLastChar() {
        let newVar = $(myInput).val().slice(0, -1)
        if (firstNum != "") {
            firstNum = firstNum.slice(0, -1)
        } else if (secondNum != "") {
            secondNum = secondNum.slice(0, -1)
        }

        $(myInput).val(newVar)
    }

    function showUI() {
        if (firstNum.length >= 13) {
            $(".main-result").css("font-size", "40px")
            $(myInput).val(firstNum)
            return
        }
        resetFont()
        $(myInput).val(firstNum)
    }

    function showAllUI() {
        if ($(myInput).val().length >= 13) {
            $(".main-result").css("font-size", "40px")
            $(myInput).val(`${firstNum}${secondNum}`)
            return
        }
        resetFont()
        $(myInput).val(`${firstNum}${secondNum}`)
    }

    function showResultUI() {
        if (result.toString().length > 18) {
            result = 0
            operator = null;
            $(myInput).val(result)
            return
        } else if (result.length >= 15) {
            $(".main-result").css("font-size", "40px")
            $(myInput).val(result)
        }

        $(myInput).val(result)

    }

    function clearInput() {
        $(myInput).val("0")
        firstNum = "";
        secondNum = "";
        operator = null;
        activation = false;
        result = null;
    }

    function resetFont() {
        $(".main-result").css("font-size", "50px")
    }

    function showEqual() {
        switch (operator) {
            case "+":
                result = parseFloat(firstNum) + parseFloat(secondNum);
                showResultUI()
                break;
            case "-":
                result = parseFloat(firstNum) - parseFloat(secondNum);
                showResultUI()
                break;
            case "×":
                result = parseFloat(firstNum) * parseFloat(secondNum);
                showResultUI()
                break;
            case "÷":
                result = parseFloat(firstNum) / parseFloat(secondNum);
                showResultUI()
                break
            default:
                break;
        }
    }




    $(".darkCircle").click((e) => {
        if (!activate) {
            $(".darkCircle").animate(
                {
                    left: "44px"
                },
                800
            );

            $(".container").fadeIn(function(){
                $(".container").css("background-color","#F1F2F3")
            })
            $(".main-result").css("color","black")
            $(".darkBtn").attr("src", "./assets/icon/lightBtn.svg");

            $(".darkCircle").attr("src", "./assets/icon/lightCircle.svg");

            $(".moon").fadeOut("slow", function () {
                $(this).fadeIn("slow");
                $(this).attr("src", "./assets/icon/sun.svg");
                $(this).css("right", "44px");
            });

            
           
            
        } else {
            $(".darkCircle").animate(
                {
                    left: "4px"
                },
                800
            );


            $(".container").fadeIn(function(){
                $(".container").css({"background-color": "#17171C"})
            })
            $(".main-result").css("color","#FFF")
            $(".darkBtn").attr("src", "./assets/icon/darkBtn.svg");

            $(".darkCircle").attr("src", "./assets/icon/darkCircle.svg");

            $(".moon").fadeOut("slow", function () {
                $(this).fadeIn("slow");
                $(this).attr("src", "./assets/icon/moon.svg");
                $(this).css("right", "4px");
            });


        }

        activate = !activate;
    });



})

