import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ToastProvider} from "../../providers/toast/toast";
import {GalleryModal} from 'ionic-gallery-modal';

@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  private result: string;

  items: Producto[] = [
    {
      ID: 1,
      Codigo: '00001',
      Descripcion: 'Sony Televisor',
      Image: 'assets/imgs/logo.png'
    },
    {
      ID: 2,
      Codigo: '00002',
      Descripcion: 'LG Televisor',
      Image: 'assets/imgs/logo.png'
    },
    {
      ID: 3,
      Codigo: '00003',
      Descripcion: 'Lavadora MABE 150kg',
      Image: 'assets/imgs/logo.png'
    },
    {
      ID: 4,
      Codigo: '00004',
      Descripcion: 'Cocina Indurama',
      Image: 'assets/imgs/logo.png'
    },
    {
      ID: 5,
      Codigo: '00005',
      Descripcion: 'Cocina Electrolux',
      Image: 'assets/imgs/logo.png'
    }
  ];
  selections: any[] = [];
  canViewImage: boolean = true;

  constructor(public navCtrl: NavController,
              private barcodeScanner: BarcodeScanner,
              private modalCtrl: ModalController,
              public toast: ToastProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProductoPage', this.items);
  }

  selected(item: Producto) {
    item.Select = !item.Select;
  }

  ordenar() {
    this.items.sort((a, b) => (a.Select) ? -1 : 1);
  }

  showImage(producto: any) {
    if (this.canViewImage) {
      this.canViewImage = false;
      let modal = this.modalCtrl.create(GalleryModal, {
        photos: [{
          url: producto.Image,
          title: producto.Descripcion
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
      this.result = barcodeData.text;
    }).catch(err => {
      console.log('Ha ocurrido un error', err);
      this.result = "Ha ocurrido un error";
    });
  }

}

interface Producto {
  ID: number;
  Codigo: string;
  Descripcion: string;
  Image: string;
  Select?: boolean;
}
