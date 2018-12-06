import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';
import { StatsPage } from '../stats/stats';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    total = 0;
    items_list = [];
    current_date : any;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController) {
        this.current_date = moment().format('DD MMMM YYYY');

        if (localStorage.items_list === undefined || localStorage.items_list === null) {
            console.log("No items");
        } else {
            this.items_list = JSON.parse(localStorage.items_list);
            this.calculateTotal();
        }

  }

  deletePrompt(i) {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteItem(i);
          }
        }, {
          text: 'Edit',
          handler: () => {
            this.editItem(i);
          }
        }
      ]
    });
    actionSheet.present();
  }

  clearPrompt() {
    const actionSheet = this.actionSheetCtrl.create({
        title: 'Are you Sure?',
      buttons: [
        {
          text: 'Yes, Clear All My Data',
          role: 'destructive',
          handler: () => {
            this.clearData();
          }
        }, {
          text: 'Cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }


  clearData() {
      this.items_list = [];
      localStorage.items_list = JSON.stringify(this.items_list);
      this.calculateTotal();
  }

  editItem(i) {
      let prompt = this.alertCtrl.create({
        title: 'Edit Item',
        message: "Edit the expense details",
        inputs: [
          {
            name: 'title',
            placeholder: 'Title',
            value: this.items_list[i].title
          },
          {
            name: 'amount',
            placeholder: 'Amount',
            type: 'tel',
            value: this.items_list[i].amount
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              this.editEntry(i, data.title, data.amount);
            }
          }
        ]
      });
      prompt.present();
  }


  addToLog() {
    let prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: "Enter the expense details",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'amount',
          placeholder: 'Amount',
          type: 'tel'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.addToEntry(data.title, data.amount);
          }
        }
      ]
    });
    prompt.present();
  }

  formatDate(date) {
      return moment(date).fromNow();
  }

  deleteItem(i) {
      this.items_list.splice(i, 1);
      localStorage.items_list = JSON.stringify(this.items_list);
      this.calculateTotal();
  }


  addToEntry(title, amount) {
      this.items_list.push({title: title, amount : amount, date: new Date() });
      localStorage.items_list = JSON.stringify(this.items_list);
      this.calculateTotal();
      console.log(this.items_list);
  }

  editEntry(i, title, amount) {
      this.items_list[i].title = title;
      this.items_list[i].amount = amount;
      this.items_list[i].date = new Date();
      localStorage.items_list = JSON.stringify(this.items_list);
      this.calculateTotal();
      console.log(this.items_list);
  }

  gotToStats() {
      this.navCtrl.push(StatsPage);
  }

  calculateTotal() {
      this.total = 0;

      if (this.items_list.length > 0) {
          for (var i = 0; i < this.items_list.length; i += 1) {
              this.total = Number(this.total) + Number(this.items_list[i].amount);
          }
      } else {
          this.total = 0;
      }
  }

}
