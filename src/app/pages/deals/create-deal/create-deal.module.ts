import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { CreateDealPageRoutingModule } from './create-deal-routing.module';
import { CreateDealPage } from './create-deal.page';

@NgModule({
	imports: [
		BrMaskerModule,
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		CreateDealPageRoutingModule
	],
	declarations: [CreateDealPage]
})
export class CreateDealPageModule { }
