import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DealItemComponent } from './deal-item.component';

@NgModule({
	imports: [
		CommonModule,
		IonicModule
	],
	declarations: [
		DealItemComponent
	],
	exports: [
		DealItemComponent
	]
})
export class DealItemComponentModule { }
