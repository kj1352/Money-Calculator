import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private localNotifications: LocalNotifications) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.localNotifications.schedule({
          text: 'Delayed ILocalNotification',
          led: 'FF0000',
          trigger: {at: new Date(new Date().getTime() + 3600)},
          every: 24*60,
      });

      platform.registerBackButtonAction(() => {
        //sometimes the best thing you can do is not think, not wonder, not imagine, not obsess.
        //just breathe, and have faith that everything will work out for the best.
      },1);

    });
  }
}
