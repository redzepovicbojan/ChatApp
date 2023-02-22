export class Chatroom {
  constructor(r, u) {
    this.room = r;
    this.username = u;
    this.chats = db.collection("chats");
    this.unsub; // It will be "undefined" when creating an object
  }

  // Setters
  set room(r) {
    this._room = r;
  }

  set username(u) {
    if (u.length >= 2 && u.length <= 10 && !/\s/g.test(u)) {
      this._username = u;
    } else {
      alert("Username is not valid!");
    }
  }

  // Getters
  get room() {
    return this._room;
  }
  get username() {
    return this._username;
  }

  //Update room
  updateRoom(ur) {
    this.room = ur;
    if (this.unsub) {
      this.unsub();
    }
  }

  // Adding a new message
  async addChat(mess) {
    // Add current time
    let date = new Date();

    // Forwarding the creation of the document/object to the database
    let docChat = {
      message: mess,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(date),
    };

    let response = await this.chats.add(docChat);
    return response; // Return promise and we can claim .then and .catch
  }

  // Tracking messages in the database and printing added messages
  getChats(callback) {
    this.unsub = this.chats
      .orderBy("created_at", "asc")
      .where("room", "==", this.room)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type == "added") {
            callback(change.doc.data());
            //console.log(change.doc.data())
          }
        });
      });
  }
}
