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

  search: string = '';

  lsProductos: Productos = {
    items: [],
    count: 0
  };

  selections: Producto[] = [];
  canViewImage: boolean = true;
  countInfiniteScroll: number;

  constructor(public navCtrl: NavController,
              private barcodeScanner: BarcodeScanner,
              private modalCtrl: ModalController,
              public toast: ToastProvider,
              public crud: CrudProvider) {
    this.countInfiniteScroll = 0;
  }

  ionViewDidLoad() {
    this.getProductos();
  }

  selected(item: Producto) {

    if (item.Select) {
      // Quitar de Selections
      let idx = this.selections.findIndex(producto => item.IDPD == producto.IDPD);
      this.selections.splice(idx, 1);
      this.lsProductos.items = [...this.lsProductos.items, {
        ...item,
        Select: false
      }];
    } else {
      // Agregar de Selections
      let idx = this.lsProductos.items.findIndex(producto => item.IDPD == producto.IDPD);
      this.lsProductos.items.splice(idx, 1);
      this.selections = [...this.selections, {
        ...item,
        Select: true
      }];
    }
  }

  showImage(producto: Producto) {
    if (this.canViewImage) {
      this.canViewImage = false;
      let modal = this.modalCtrl.create(GalleryModal, {
        photos: [{
          url: producto.Image || 'assets/imgs/logo.png',
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

  getSelections() {
    return this.selections.map(producto => producto.IDPD);
  }

  getProductos() {
    this.crud.get('producto', {
      limite: 30,
      search: this.search,
      exclude: this.getSelections().join(',') || ''
    }).then((result: Productos) => {
      this.lsProductos = result;
      this.toast.showToast(`Cant. Productos: ${result.count}`, 1500, 'top')
    })
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
