import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { BidService } from 'src/app/services/bid.service';
import { DealService } from 'src/app/services/deal.service';
import { UserService } from 'src/app/services/user.service';
import { DealBidListViewModel } from 'src/app/view-model/deal-bid-list-view.model';
import { DealListViewModel } from 'src/app/view-model/deal-list-view.model';

@Component({
	selector: 'app-my-deals',
	templateUrl: './my-deals.page.html',
	styleUrls: ['./my-deals.page.scss'],
})
export class MyDealsPage implements OnInit {

	segment: string;
	myDeals: DealListViewModel[];
	myBids: DealBidListViewModel[];

	constructor(
		private alertService: AlertService,
		private bidService: BidService,
		private dealService: DealService,
		private loadingCtrl: LoadingController,
		private navCtrl: NavController,
		private userService: UserService
	) { }

	ngOnInit(): void {
		this.segment = "deal";
		this.getData();
	}

	getData(refresher?: any): void {
		switch (this.segment) {
			case "deal":
				if (!this.myDeals || refresher) {
					this.getMyDeals(refresher);
				}
				break;
				
			case "bid":
				if (!this.myBids || refresher) {
					this.getMyBids(refresher);
				}
				break;
				
			default:
				break;
		}
	}

	segmentChanged(event: any): void {
		this.getData();
	}

	async getMyDeals(refresher?: any): Promise<void> {
		const loading: HTMLIonLoadingElement = await this.loadingCtrl.create();
		try {
			if (!refresher) {
				await loading.present();
			}
			await loading.present();
			this.myDeals = await this.dealService.getMyDeals(this.userService.user.id);
		} catch (error) {
			this.alertService.showAlertError(error);
			this.myDeals = [];
		} finally {
			if (refresher) {
				refresher.target.complete();
			}
			loading.dismiss();
		}
	}

	async getMyBids(refresher?: any): Promise<void> {
		const loading: HTMLIonLoadingElement = await this.loadingCtrl.create();
		try {
			if (!refresher) {
				await loading.present();
			}
			this.myBids = await this.bidService.getMyBids(this.userService.user.id);
		} catch (error) {
			this.alertService.showAlertError(error);
			this.myBids = [];
		} finally {
			if (refresher) {
				refresher.target.complete();
			}
			loading.dismiss();
		}
	}

	createDeal(): void {
		this.navCtrl.navigateForward("/create-deal");
	}

	seeDealDetails(item: DealListViewModel): void {
		this.navCtrl.navigateForward(["deal", item.id]);
	}

	seeBidDetails(): void {
		this.alertService.showToast("Em breve você poderá acompanhar o status da sua oferta!");
	}
}
