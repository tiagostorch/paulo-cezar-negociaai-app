import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DealDetailsPageRoutingModule } from './deal-details-routing.module';
import { DealDetailsPage } from './deal-details.page';
import { ModalBidPageModule } from './modal-bid/modal-bid.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ModalBidPageModule,
		DealDetailsPageRoutingModule
	],
	declarations: [DealDetailsPage]
})
export class DealDetailsPageModule { }
