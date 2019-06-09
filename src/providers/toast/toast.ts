import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";

@Injectable()
export class ToastProvider {

  constructor(public toast: ToastController) {
    // console.log('Hello ToastProvider Provider');
  }

  showNotFoundImagen() {
    let msg = 'No se pudo encontrar la imagen';
    this.showToast(msg)
  }

  private showToast(msg: string) {
    this.toast.create({
      message: msg,
      duration: 2000
    }).present()
  }


}
