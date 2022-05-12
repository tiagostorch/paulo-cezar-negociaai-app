import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MyDealsPage } from './my-deals.page';

const routes: Routes = [
	{
		path: '',
		component: MyDealsPage,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MyDealsPageRoutingModule { }
