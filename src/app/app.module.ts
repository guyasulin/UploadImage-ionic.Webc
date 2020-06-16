import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';


/** Alyle UI */
import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LY_THEME_GLOBAL_VARIABLES,
  LyHammerGestureConfig, LyThemeModule
} from '@alyle/ui';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { color } from '@alyle/ui/color';

export class GlobalVariables {
  testVal = color(0x00bcd4);
  Quepal = {
    default: `linear-gradient(135deg,#11998e 0%,#38ef7d 100%)`,
    contrast: color(0xffffff),
    shadow: color(0x11998e)
  };
  SublimeLight = {
    default: `linear-gradient(135deg,#FC5C7D 0%,#6A82FB 100%)`,
    contrast: color(0xffffff),
    shadow: color(0xB36FBC)
  };
  Amber = {
    default: color(0xffc107),
    contrast: color(0, 0, 0, 0.87)
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HammerModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    [LyTheme2],
    [StyleRenderer],
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    {
      provide: LY_THEME,
      useClass: MinimaLight,
      multi: true
    },
    {
      provide: LY_THEME,
      useClass: MinimaDark,
      multi: true
    },
    {
      provide: LY_THEME_GLOBAL_VARIABLES,
      useClass: GlobalVariables
    }, // global variables
    // Gestures
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig }, StyleRenderer, LyTheme2, { provide: LY_THEME, useClass: MinimaLight, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
