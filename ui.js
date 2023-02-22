import { Chatroom } from "./chat.js";

export class ChatUI {
  constructor(list) {
    this.listOfMessages = list;
  }

  // Setter and getter
  set listOfMessages(list) {
    this._listOfMessages = list;
  }

  get listOfMessages() {
    return this._listOfMessages;
  }

  dateFormated(data) {
    let date = new Date(data.created_at.toDate());
    let todayDate = new Date();
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    let h = date.getHours();
    let min = date.getMinutes();

    // Adding 0 before singli digit values
    d = String(d).padStart(2, "0");
    m = String(m).padStart(2, "0");
    h = String(h).padStart(2, "0");
    min = String(min).padStart(2, "0");

    if (
      todayDate.getFullYear() == y &&
      todayDate.getMonth() + 1 == m &&
      todayDate.getDate() == d
    ) {
      return `${h}:${min}`;
    } else {
      return `${d}.${m}.${y}. - ${h}:${min}`;
    }
  }

  // Extract the data from the passed document and write it in the format
  // useranme: message
  // time_stamp

  templateLI(data, uN) {
    let htmlLI;
    if (data.username == uN) {
      htmlLI = `<li class="msgr" style="position:relative">
                <span class="username">${data.username}: </span>
                <span class="message">${data.message}</span>
                <div class="date">${this.dateFormated(data)}</div> 
                <i id="kanta" class="fa fa-trash-o" style="font-size:18px;color:silver;position:absolute;bottom:10px;right:20px;"></i>
            </li>`;
    } else {
      htmlLI = `<li class="msg" style="position:relative">
                <span class="username">${data.username}: </span>
                <span class="message">${data.message}</span>
                <div class="date">${this.dateFormated(data)}</div> 
                <i id="kanta" class="fa fa-trash-o" style="font-size:18px;color:silver;position:absolute;bottom:10px;right:20px;"></i>
            </li>`;
    }
    this.listOfMessages.innerHTML += htmlLI;
  }

  clearUL() {
    this.listOfMessages.innerHTML = "";
  }
}
