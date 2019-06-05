import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';

/* Plugins */
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {LongPressModule} from "ionic-long-press";
import * as ionicGalleryModal from 'ionic-gallery-modal';

/* Pages */
import {HomePage, LoginPage, ProductoPage} from "../pages/index.page";

/* Provider */
import {ToastProvider} from '../providers/index.provider';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ProductoPage
  ],
  imports: [
    BrowserModule,
    LongPressModule,
    IonicModule.forRoot(MyApp),
    ionicGalleryModal.GalleryModalModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ProductoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HAMMER_GESTURE_CONFIG, useClass: ionicGalleryModal.GalleryModalHammerConfig},
    ToastProvider
  ]
})
export class AppModule {
}
