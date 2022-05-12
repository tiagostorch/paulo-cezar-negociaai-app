import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DealBidItemComponent } from 'src/app/components/deal-bid-item/deal-bid-item.component';
import { DealItemComponentModule } from 'src/app/components/deal-item/deal-item.module';
import { MyDealsPageRoutingModule } from './my-deals-routing.module';
import { MyDealsPage } from './my-deals.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		MyDealsPageRoutingModule,
		DealItemComponentModule
	],
	declarations: [
		MyDealsPage,
		DealBidItemComponent
	]
})
export class MyDealsPageModule { }
