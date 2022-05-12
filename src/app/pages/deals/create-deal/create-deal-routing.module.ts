import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CreateDealPage } from './create-deal.page';

const routes: Routes = [
	{
		path: '',
		component: CreateDealPage,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CreateDealPageRoutingModule { }
