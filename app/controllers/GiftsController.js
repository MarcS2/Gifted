import { AppState } from "../AppState.js";
import { giftsService, } from "../services/GiftsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";
import { getFormData } from "../utils/FormHandler.js";
import { Gift } from "../models/Gift.js";



function _drawGifts() {
  const gifts = AppState.gifts
  let content = ''
  // gifts.forEach(gift => content += gift.unopenedGift)
  gifts.forEach(gift => {
    if (gift.opened) {
      content += gift.giftCardTemplate
    } else if (!gift.opened) {
      content += gift.unopenedGift
    }
  })
  setHTML('gift-card', content)
}
function _drawFrom() {
  if (!AppState.account) {
    return
  } {
    setHTML('formTemplate', Gift.formTemplate)
  }


}

// **NOTE - We Don't Need this, the function above does it for us
// function _drawOpenedGift(giftId) {
//   const gifts = AppState.gifts
//   let content = ''
//   const foundGift = gifts.find(gift => gift.id == giftId)
//   content += foundGift.giftCardTemplate
//   setHTML('gift-card', content)
// }

export class GiftsController {
  constructor() {
    console.log('Controller loaded');
    this.getGifts()
    setInterval(this.getGifts, 1000)
    AppState.on('gifts', _drawGifts)
    AppState.on('account', _drawFrom)
  }
  async getGifts() {
    try {
      await giftsService.getGifts()

    } catch (error) {
      Pop.error(error)
      console.log(error);
    }
  }

  async createGift(event) {
    try {
      event.preventDefault()
      console.log('got form')
      const form = event.target
      const giftFormData = getFormData(form)
      await giftsService.createGift(giftFormData)

    } catch (error) {
      Pop.error(error)
      console.error(error)
    }

  }
  async openGifts(giftId) {
    try {
      console.log('button', giftId)
      await giftsService.openGifts(giftId)
      AppState.emit('gifts')
    } catch (error) {
      console.error(error.message)
    }
  }

}