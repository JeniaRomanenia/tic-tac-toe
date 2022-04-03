//X => <i class="fa fa-times" aria-hidden="true"></i>
//O => <i class="fa fa-circle-o-notch" aria-hidden="true"><i>

//выводим тегов в "Start Page"
let satrtingPage = document.querySelector(".start");
let choose = document.querySelectorAll(".choose");

//выводим тегов в "Main Page"
let mainPage = document.querySelector(".mainPage");
let showChange = document.querySelector(".showChange");
let boxes = document.querySelectorAll(".boxes");

//выводим тегов в "Winner Page"
let winnerPage = document.querySelector(".winner");
let winnerName = document.querySelector(".wiinnerName");
let quit = document.querySelector(".quit");

//как мы можем изменить ход
//False => ИгрокX
//True => ИгрокO
let changeTurn = null;

//выбери, кто ты?
//O или X
choose.forEach(chooseNow => {
  chooseNow.addEventListener("click", () =>{
    if(chooseNow.id === "playerX"){
      changeTurn = false;
      //console.log(changeTurn);
      showChange.style.left = `0px`;
    }else{
      changeTurn = true;
      //console.log(changeTurn);
      showChange.style.left = `160px`;
    }
    satrtingPage.style.display = "none";
    mainPage.style.display = "block";
  })
});

boxes.forEach(items => {
  items.addEventListener("click", ()=>{
    //добавлять "X" иконку если changeTurn = false
    //добавлять "O" иконку если changeTurn = true
    if(changeTurn == false){
      items.innerHTML = `<i class="fa fa-times" aria-hidden="true"></i>`;
      items.id = "X";
      items.style.pointerEvents = "none";
      showChange.style.left = `160px`;

      //звук
      soundX();

      //меняем "changeTurn" значение false на true
      changeTurn = true;
    }else{
      items.innerHTML = `<i class="fa fa-circle-o-notch" aria-hidden="true"><i>`;
      items.id = "O";
      items.style.pointerEvents = "none";
      showChange.style.left = `0px`;

      //звук
      soundO();

      //меняем "changeTurn" значение false на true
      changeTurn = false;
    }
    winningFunc();
    drawFunc();
  })
})

//все выйгрышные комбинации
let winningCombinatioons = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

let winningFunc = ()=>{
  for (let a = 0; a <= 7; a++) {
    let b = winningCombinatioons[a];
    //console.log(b);

    if(boxes[b[0]].id == "" || boxes[b[1]].id == "" || boxes[b[2]].id == ""){
      continue;
    }else if(boxes[b[0]].id == "X" && boxes[b[1]].id == "X" && boxes[b[2]].id == "X"){
      //console.log("Х выйграл");

      //добавляем текст победителя
      winnerName.innerText = `Игрок Х Выйграл!`;

      //показывакм "Winner Page" и прячем "Main Page"
      mainPage.style.display = "none";
      winnerPage.style.display = "block";

      //запускаем музыку
      soundGameOver();

    }else if(boxes[b[0]].id == "O" && boxes[b[1]].id == "O" && boxes[b[2]].id == "O"){
      //console.log("O выйграл");

      //добавляем текст победителя
      winnerName.innerText = `Игрок O Выйграл!`;

      //показывакм "Winner Page" и прячем "Main Page"
      mainPage.style.display = "none";
      winnerPage.style.display = "block";

      //запускаем музыку
      soundGameOver();
    }
    else{
      continue;
    } 
  }
}

//Функция при ничьей
let drawFunc = ()=>{
  if(boxes[0].id != "" && boxes[1].id != "" && boxes[2].id != "" && boxes[3].id != "" && boxes[4].id != "" && boxes[5].id != "" && boxes[6].id != "" && boxes[7].id != "" && boxes[8].id != "" ){
    //добавляем текст ничья
      winnerName.innerText = `Ничья!`;

      //показывакм "Winner Page" и прячем "Main Page"
      mainPage.style.display = "none";
      winnerPage.style.display = "block";

      //запускаем музыку
      soundGameOver();
  }
}

//начать заново игру при нажатии на кнопку
quit.addEventListener("click", ()=>{
  window.location.reload();
})

//звуковые эффекты
function soundX() {
  var audio = new Audio(); 
  audio.src = "./assets/sound/dyc.mp3"; 
  audio.autoplay = true; 
}

function soundO() {
  var audio = new Audio(); 
  audio.src = "./assets/sound/boom.mp3"; 
  audio.autoplay = true; 
}


function soundGameOver() {
	let audio2 = new Audio();
	audio2.src = "./assets/sound/gameover.mp3"; 
	audio2.autoplay = true; 
}