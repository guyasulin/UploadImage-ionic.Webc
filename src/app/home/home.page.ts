import { Component, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { lyl, WithStyles, StyleRenderer, ThemeRef, ThemeVariables } from '@alyle/ui';
import { Platform } from '@angular/cdk/platform';
import {
  LyImageCropper,
  ImgCropperConfig,
  ImgCropperEvent,
  ImgCropperErrorEvent,
  STYLES as CROPPER_STYLES
} from '@alyle/ui/image-cropper';

const STYLES = (_theme: ThemeVariables, ref: ThemeRef) => {

  ref.renderStyleSheet(CROPPER_STYLES);
  const cropper = ref.selectorsOf(CROPPER_STYLES);
  return {
    cropper: lyl`{
      max-width: 400px
      height: 300px
    }`,
    sliderContainer: lyl`{
      text-align: center
      max-width: 400px
      margin: 14px
    }`,
    cropCircle: lyl`{
      ${cropper.area}, ${cropper.area}::after {
        border-radius: 50%
      }
    }`,
    cropResult: lyl`{
      border-radius: 50%
    }`
  };
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements WithStyles {

  public item: Observable<any>;
  public name: string = '';
  public itemRef: AngularFirestoreCollection;
  public loading: HTMLIonLoadingElement;
  public imageChangedEvent: any = '';
  public imageUrl: any = '';
  public showCropper = false;

  classes = this.sRenderer.renderSheet(STYLES);
  scale: number;
  @ViewChild(LyImageCropper, { static: true }) cropper: LyImageCropper;

  myConfig: ImgCropperConfig = {
    // autoCrop: true,
    width: 150,
    height: 150,
    fill: '#ff2997',
    type: 'image/png'
  };

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private loadingController: LoadingController,
    readonly sRenderer: StyleRenderer,
    private _platform: Platform
  ) {
    this.itemRef = db.collection('item')
    this.item = this.itemRef.valueChanges();
  }

  onCropped(e: ImgCropperEvent) {
    this.imageUrl = e.dataURL;
    console.log('cropped img: ', e);
  }

  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }

  fileChangeEvent(event): void {
    this.imageChangedEvent = event;
  }

  async cropIt() {
    this.itemRef.add({
      title: this.name
    })
      .then(async resp => {
        await this.uploadFile(resp.id, this.imageUrl);

        this.showCropper = false
      }).catch(error => {
        console.log(error);
      })
  }

  async uploadFile(id, file): Promise<any> {
    if (file && file.length) {
      try {
        await this.presentLoading();
        var task = await this.storage.ref('images').child(id).putString(file, 'data_url')

        this.loading.dismiss();
        return this.storage.ref(`images/${id}`).getDownloadURL()
      } catch (error) {
        console.log(error);
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    return this.loading.present();
  }
}

