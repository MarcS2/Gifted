import { AppState } from "../AppState.js";
import { Gift } from "../models/Gift.js";
import { api } from "./AxiosService.js"

class GiftsService {
  async createGift(giftFormData) {
    const res = await api.post('api/gifts', giftFormData)
    console.log('created gift')
    const newGift = new Gift(res.data)
    console.log(newGift)
    AppState.gifts.push(newGift)
    AppState.emit('gifts')

  }
  async openGifts(giftId) {
    const gifts = AppState.gifts
    const foundGift = gifts.find(gift => giftId == gift.id)
    console.log('gift', foundGift)
    foundGift.opened = true
    console.log('gift', foundGift)
    let res = await api.put(`api/gifts/${giftId}`, foundGift)
    console.log('opening gift', res)
    gifts.splice(foundGift, 1, res)
    AppState.emit('gifts')
  }
  async getGifts() {
    const res = await api.get('api/gifts')
    // console.log('[GIFT SERVICE] getGifts() got gifts', res.data);
    AppState.gifts = res.data.map(POJO => new Gift(POJO))
    // console.log('[APPSTATE] gifts', AppState.gifts);
  }





}

export const giftsService = new GiftsService