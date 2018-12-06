import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as Chartist from 'chartist';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
    labels = [];
    series = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
    var items = JSON.parse(localStorage.items_list);
    for (var i = 0; i < items.length; i += 1) {
        this.labels.push(moment(items[i].date).format('DD MMM'));
        this.series.push(items[i].amount);
    }
    this.generateStats();
  }

  generateStats() {
      new Chartist.Line('.ct-chart', {
    labels: this.labels,
    series: [
      this.series
    ]
  }, {
    low: 0,
    showArea: true
  });
  }

}
