import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BrMaskerModule } from 'br-mask';
import { ModalBidPage } from './modal-bid.page';

@NgModule({
	imports: [
		BrMaskerModule,
		CommonModule,
		FormsModule,
		IonicModule
	],
	declarations: [ModalBidPage]
})
export class ModalBidPageModule { }
