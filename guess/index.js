function createButtons() {
    let startBtn = document.querySelector(".start");
    startBtn.disabled = true;
    let cells;
    let randomWrongs;
    let select = document.querySelector(".level");
    let massage = document.querySelector(".title");
    let banner=document.querySelector("#page-banner");
    let timeleft;

    function cellMaker() {
        if (select.value == 1) {
            cells = 12;
        } else if (select.value == 2) {
            cells = 24;
        } else if (select.value == 3) {
            cells = 35;
        }
        return cells;
    }

    function wrongMaker() {
        if (select.value == 1) {
            randomWrongs = 6;
        } else if (select.value == 2) {
            randomWrongs = 12;
        } else if (select.value == 3) {
            randomWrongs = 20;
        }
        return randomWrongs;
    }

    function remaining() {
        if (select.value == 1) {
            timeleft = 10;
        } else if (select.value == 2) {
            timeleft = 15;
        } else if (select.value == 3) {
            timeleft = 20;
        }
        return timeleft;
    }
    cellMaker();
    wrongMaker();
    remaining();


 function reloading(){setTimeout(function() {
                massage.textContent = "Remember it !";
                gameBoard.style.zIndex = "1";
                gameBoard.style.opacity = "1";
                startBtn.disabled = false;
                startBtn.innerHTML = "Try Again";
                banner.style.backgroundColor="rgb(40, 120, 196)";
                for (let i = 0; i < wrongbtnArray.length; i++) {
                    wrongbtnArray[i].remove();
                }
                for (let i = 0; i < rightbtnArray.length; i++) {
                    rightbtnArray[i].remove();
                }
            }, 2000);}
    //creating buttons

    let gameBoard = document.querySelector(".game-board");
    let classes = [];

    for (let i = 0; i < cells; i++) {
        classes.push("right");
    }
    for (let i = 0; i < randomWrongs; i++) {
        let random = Math.floor(Math.random() * cells);
        classes[random] = "wrong";
    }
    let rightbtnArray = [];
    let wrongbtnArray = [];
    for (let i = 0; i < cells; i++) {
        let btn = document.createElement("button");
        gameBoard.appendChild(btn);

        btn.setAttribute("class", classes[i]);

        if (btn.className == "right") {
            rightbtnArray.push(btn);
        } else if (btn.className == "wrong") {
            wrongbtnArray.push(btn);
        }

        //medium & hard level style
        for (let i = 0; i < wrongbtnArray.length; i++) {
            if (select.value == 2) {
                wrongbtnArray[i].style.width = "75px";
                wrongbtnArray[i].style.height = "75px";
                wrongbtnArray[i].style.margin = "1px";
            } else if (select.value == 3) {
                wrongbtnArray[i].style.width = "60px";
                wrongbtnArray[i].style.height = "60px";
            }
        }
        for (let i = 0; i < rightbtnArray.length; i++) {
            if (select.value == 2) {
                rightbtnArray[i].style.width = "75px";
                rightbtnArray[i].style.height = "75px";
                rightbtnArray[i].style.margin = "1px";
            } else if (select.value == 3) {
                rightbtnArray[i].style.width = "60px";
                rightbtnArray[i].style.height = "60px";
            }
        }
    }

    //fading show
    for (let i = 0; i < rightbtnArray.length; i++) {
        rightbtnArray[i].classList.add("fade");
    }
    setTimeout(function() {
        for (let i = 0; i < rightbtnArray.length; i++) {
            rightbtnArray[i].classList.remove("fade");
        }
    }, 700);





    //wrong click
    let cond;
    for (let i = 0; i < wrongbtnArray.length; i++) {
        wrongbtnArray[i].addEventListener("click", function(e) {
            e.target.className = "wrong-click";
            cond = true;
            for (let i = 0; i < rightbtnArray.length; i++) {
                rightbtnArray[i].setAttribute("class", "right-click");
            }
            for (let i = 0; i < wrongbtnArray.length; i++) {
                wrongbtnArray[i].setAttribute("class", "wrong-click");
            }
            gameBoard.style.zIndex = "-1";
            gameBoard.style.opacity = "0.8";
            for (let i = 0; i < rightbtnArray.length; i++) {
                rightbtnArray[i].style.backgroundColor = "rgb(97, 151, 221)";
            }
            massage.textContent = "you lost :(";
            banner.style.backgroundColor="#b34f4f";
            //losing the game

          reloading();
        });
    }

    //right click event
    let counterWin = 0;
    for (let i = 0; i < rightbtnArray.length; i++) {
        rightbtnArray[i].addEventListener("click", function(e) {
            e.target.setAttribute("class", "right-click");
            e.target.disabled = true;
            counterWin++;

            console.log(counterWin);
            //wining

            if (rightbtnArray.length === counterWin) {
                gameBoard.style.zIndex = "-1";
                gameBoard.style.opacity = "0.7";
                let massage = document.querySelector(".title");
                massage.textContent = "Win";
                
                banner.style.backgroundColor="green";
                for (let i = 0; i < rightbtnArray.length; i++) {
                    rightbtnArray[i].style.backgroundColor = "rgb(97, 151, 221)";
                }
                reloading();
            }
        });
    }
    //count down

    let downloadTimer = setInterval(function() {
        massage.innerHTML = `00:${timeleft}  remaining`;
        if (timeleft <= 0 && counterWin < rightbtnArray.length) {
            clearInterval(downloadTimer);
            for (let i = 0; i < rightbtnArray.length; i++) {
                rightbtnArray[i].setAttribute("class", "right-click");
                massage.innerHTML = "lost";
            }
            for (let i = 0; i < wrongbtnArray.length; i++) {
                wrongbtnArray[i].setAttribute("class", "wrong-click");
            }
            reloading();
        } else if (timeleft >= 0 && counterWin === rightbtnArray.length) {
            clearInterval(downloadTimer);
            massage.innerHTML = "Win";
        } else if (cond) {
            clearInterval(downloadTimer);
            massage.innerHTML = "you lost :(";
            
        }

        timeleft -= 1;
    }, 1000);
}