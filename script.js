// ===========================
// Настройки Telegram
// ===========================

const TOKEN = "ВСТАВЬ_СВОЙ_ТОКЕН";
const CHAT_ID = "ВСТАВЬ_CHAT_ID";

// ===========================
// Элементы
// ===========================

const envelope = document.getElementById("envelope");
const openButton = document.getElementById("openButton");
const sendBtn = document.getElementById("sendBtn");
const thanks = document.getElementById("thanks");
const status = document.getElementById("status");
const textarea = document.getElementById("gift");
const petals = document.getElementById("petals");

// ===========================
// Падающие лепестки
// ===========================

const symbols = ["🌸","✨","🎀","🌼","🫧"];

for(let i = 0; i < 45; i++){

    createPetal();

}

function createPetal(){

    const petal = document.createElement("div");

    petal.className = "petal";

    petal.innerHTML =
        symbols[Math.floor(Math.random()*symbols.length)];

    petal.style.left = Math.random()*100 + "vw";

    petal.style.animationDuration =
        8 + Math.random()*10 + "s";

    petal.style.animationDelay =
        -Math.random()*20 + "s";

    petal.style.fontSize =
        18 + Math.random()*18 + "px";

    petals.appendChild(petal);

}

// ===========================
// Открытие письма
// ===========================

openButton.addEventListener("click",()=>{

    envelope.classList.add("open");

    openButton.style.display="none";

    const letter = document.getElementById("letter");

    letter.style.transitionDelay="0.45s";

});

// ===========================
// Отправка Telegram
// ===========================

sendBtn.addEventListener("click",sendMessage);

async function sendMessage(){

    const text = textarea.value.trim();

    if(text===""){

        status.innerHTML="🌸 Напиши ответ 😊";

        return;

    }

    sendBtn.disabled=true;

    sendBtn.innerHTML="Отправляем...";

    try{

        const response = await fetch(

            `https://api.telegram.org/bot${TOKEN}/sendMessage`,

            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    chat_id:CHAT_ID,

                    text:
`🎁 Ответ на вопрос "Что тебе подарить?"

${text}`

                })

            }

        );

        if(response.ok){

            successAnimation();

        }else{

            status.innerHTML="❌ Ошибка отправки";

            sendBtn.disabled=false;

            sendBtn.innerHTML="🌸 Отправить ответ";

        }

    }

    catch{

        status.innerHTML="❌ Нет соединения";

        sendBtn.disabled=false;

        sendBtn.innerHTML="🌸 Отправить ответ";

    }

}

// ===========================
// Красивое завершение
// ===========================

function successAnimation(){

    envelope.classList.remove("open");

    setTimeout(()=>{

        thanks.style.display="flex";

    },800);

}
