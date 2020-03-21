import { LocalDataService } from './../../services/local-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

	@Input() newItem: Article;
	@Input() index: number;
	@Input() favoritePage: boolean;
	constructor(
		private inAppBrowser: InAppBrowser,
		private actionSheetController: ActionSheetController,
		private socialSharing: SocialSharing,
		private localDataService: LocalDataService) { }

	ngOnInit() {}

	openNew() {
		const browser = this.inAppBrowser.create(this.newItem.url, '_system');
	}

	async openMenu() {

		let btnFavoriteRemove;

		if(this.favoritePage) {
			btnFavoriteRemove = {
				text: 'Delete',
				icon: 'trash-outline',
				handler: () => {
					this.localDataService.deleteNew(this.newItem);
				}
			  }
		} else {

			btnFavoriteRemove = {
				text: 'Add to favorite',
				icon: 'star-outline',
				handler: () => {
					  this.localDataService.saveNew(this.newItem);
				}
			  }
		}

		const actionSheet = await this.actionSheetController.create({
			buttons: [
			{
			  text: 'Share',
			  icon: 'share',
			  handler: () => {
				console.log('Share clicked');
				this.socialSharing.share(this.newItem.title, this.newItem.source.name, '', this.newItem.url);
			  }
			},btnFavoriteRemove, {
			  text: 'Cancel',
			  icon: 'close',
			  role: 'cancel',
			  handler: () => {
				console.log('Cancel clicked');
			  }
			}]
		  });
		  await actionSheet.present();
	}

}
