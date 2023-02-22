import { Chatroom } from "./chat.js";
import { ChatUI } from "./ui.js";

// DOM
let ul = document.querySelector("ul");
let btnSend = document.getElementById("send");
let msgValue = document.getElementById("yourMessage");
let userName = document.getElementById("userName");
let btnUserName = document.getElementById("userNameUpdate");
let writeUserName = document.getElementById("writeUserName");
let updateColor = document.getElementById("colorUpdate");

let uName = localStorage.getItem("userName");
let lsRoom = localStorage.getItem("room");
let chatroom = new Chatroom("#general", `anonymous`);

if (uName) {
  chatroom.username = uName;
}

chatroom.getChats((data) => {
  console.log(data);
});

///////////////////////////////////////////////
let chatUI1 = new ChatUI(ul);

chatroom.getChats((data, uN) => {
  uN = uName;
  chatUI1.templateLI(data, uN);
});

btnSend.addEventListener("click", (e) => {
  e.preventDefault();
  if (msgValue.value != "") {
    chatroom
      .addChat(msgValue.value)
      .then(() => (msgValue.value = "")) // Ispraviti da forma bude forma a ne div i stavidi forma.reset();
      .catch((err) => console.log("Error: " + err));
  }
});

///// When is submit button "Update", change Username:
btnUserName.addEventListener("click", (e) => {
  e.preventDefault();
  chatroom.username = userName.value;
  localStorage.setItem("userName", `${chatroom.username}`);
  if (chatroom.username == userName.value) {
    writeUserName.innerHTML = `Updated username:  <b>${chatroom.username}</b>`;
    setTimeout(() => {
      writeUserName.innerHTML = "";
    }, 3000);
  }
  userName.value = "";
});

let clickQS = document.querySelector(".buttons");
let clicks = document.querySelectorAll(".button");
console.log(clicks);

console.log(lsRoom);
if (lsRoom == null) {
  clicks[0].style.backgroundColor = "lightskyblue";
} else {
  clicks.forEach((btn) => {
    if (btn.textContent == lsRoom) {
      btn.style.backgroundColor = "lightskyblue";
    }
  });
}

// Buttons for change room
clickQS.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    clicks.forEach((btn) => {
      btn.style.backgroundColor = "blue";
    });
    let btn = e.target.textContent;
    localStorage.setItem("room", `${btn}`);
    e.target.style.backgroundColor = "lightskyblue";
    chatroom.updateRoom(btn);
    chatUI1.clearUL();
    chatroom.getChats((data, uN) => {
      uN = uName;
      chatUI1.templateLI(data, uN);
    });
  }
});

///// Color change:

let colorPicker = document.getElementById("cp");
console.log(colorPicker.value);

let lsColor = localStorage.getItem("color");
if (lsColor) {
  document.body.style.backgroundColor = lsColor;
}

updateColor.addEventListener("click", (e) => {
  localStorage.setItem("color", `${colorPicker.value}`);
  setTimeout(() => {
    document.body.style.backgroundColor = colorPicker.value;
  }, 500);
});

//////////////////////////////
// 2. zadatak

ul.addEventListener("click", (e) => {
  if (e.target.tagName == "I") {
    e.target.parentNode.remove();
  }
});
