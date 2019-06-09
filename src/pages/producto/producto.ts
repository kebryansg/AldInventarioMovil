import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ToastProvider} from "../../providers/toast/toast";
import {GalleryModal} from 'ionic-gallery-modal';
import {CrudProvider} from "../../providers/crud/crud";

@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  search: string;

  lsProductos: Productos;

  selections: any[] = [];
  canViewImage: boolean = true;

  constructor(public navCtrl: NavController,
              private barcodeScanner: BarcodeScanner,
              private modalCtrl: ModalController,
              public toast: ToastProvider,
              public crud: CrudProvider) {
  }

  ionViewDidLoad() {
    this.crud.get('producto', {
      limite: 15
    }).then((result: any) => this.lsProductos = result)
  }

  selected(item: Producto) {
    item.Select = !item.Select;
  }

  ordenar() {
    this.lsProductos.items.sort((a, b) => (a.Select) ? -1 : 1);
  }

  showImage(producto: Producto) {
    if (this.canViewImage) {
      this.canViewImage = false;
      let modal = this.modalCtrl.create(GalleryModal, {
        photos: [{
          url: producto.Image,
          title: producto.Nombre
        }],
        initialSlide: 0,
      });
      modal.onDidDismiss(() => {
        this.canViewImage = true;
      });
      modal.present();
    }
  }

  scanNow() {
    this.barcodeScanner.scan(
      /* {
         preferFrontCamera : true, // iOS and Android
         showFlipCameraButton : true, // iOS and Android
         showTorchButton : true, // iOS and Android
         torchOn: true, // Android, launch with the torch switched on (if available)
         prompt : "Place a barcode inside the scan area", // Android
         resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
         formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
         orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
         disableAnimations : true, // iOS
         disableSuccessBeep: false // iOS and Android
     } */
    ).then(barcodeData => {
      console.log('Barcode data', JSON.stringify(barcodeData));
      this.search = barcodeData.text;
    }).catch(err => {
      console.log('Ha ocurrido un error', err);
      this.search = "Ha ocurrido un error";
    });
  }

}

interface Productos {
  items: Producto[],
  count: number
}

interface Producto {
  IDPD: number;
  Codigo: string;
  CodigoExterno: string;
  Nombre: string;
  Image?: string;
  Select?: boolean;
}
