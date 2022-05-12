import { Component, Input } from '@angular/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform } from '@ionic/angular';
import { DealBidListViewModel } from 'src/app/view-model/deal-bid-list-view.model';

@Component({
	selector: 'deal-bid-item',
	templateUrl: './deal-bid-item.component.html',
	styleUrls: ['./deal-bid-item.component.scss'],
})
export class DealBidItemComponent {

	@Input()
	dealBid: DealBidListViewModel;

	constructor(
		private platform: Platform,
		private webView: WebView
	) { }

	convertFileSrc(path: string): string {
		if (!path || !this.platform.is("cordova")) return path;
		return this.webView.convertFileSrc(path);
	}
}
