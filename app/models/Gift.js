export class Gift {
  constructor(data) {
    this.id = data.id
    this.tag = data.tag
    this.url = data.url
    this.opened = data.opened
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
    this.updatedAt = data.updateAt
  }


  get giftCardTemplate() {
    return `<div class="col-3 border border-3 border-dark text-center m-3 p-3">
    <img class="img-fluid"
      src="${this.url}"
      alt="">
    <p>${this.tag}</p>
  </div>`
  }


  get unopenedGift() {
    return ` <div class="col-3 border border-3 border-dark text-center m-3 p-3 unfliped-card d-flex justify-content-around align-items-center" type="button" onclick="app.GiftsController.openGifts('${this.id}')">
    <div class="text-bg">
      <p class="text-light align-items-center">You haven't unlocked this image</p>
    </div>
    </div>`
  }

  static get formTemplate() {
    return `
    <div class="col-12">
    <form onsubmit="app.GiftsController.createGift(event)">
      <div>
        <label for="tag">Tag</label>
        <input id="tag" type="text" name="tag" maxlength="120" required>
      </div>
      <div>
        <label for="url">Image URL</label>
        <input id="url" type="url" name="url" maxlength="500" required>

      </div>
      <button type="submit">Submit</button>

    </form>
  </div>
    `
  }
}




// let object = {
//   "_id": "6508f5fd2fcf1ecaaa140e65",
//   "tag": "DONT TRUST BIG BINGUS, HE IS EVIL!!!!!!!",
//   "url": "",
//   "opened": false,
//   "creatorId": "64f23509d0e5863cce42d2dc",
//   "createdAt": "2023-09-19T01:14:37.063Z",
//   "updatedAt": "2023-09-19T01:14:37.063Z",
//   "__v": 0,
//   "id": "6508f5fd2fcf1ecaaa140e65"
// }