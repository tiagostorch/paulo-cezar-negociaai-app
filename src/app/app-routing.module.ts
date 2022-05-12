import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
	},
	{
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
	},
	{
		path: 'create-deal',
		loadChildren: () => import('./pages/deals/create-deal/create-deal.module').then(m => m.CreateDealPageModule)
	},
	{
		path: 'deal/:id',
		loadChildren: () => import('./pages/deals/deal-details/deal-details.module').then(m => m.DealDetailsPageModule)
	},
	{
		path: 'my-deals',
		loadChildren: () => import('./pages/deals/my-deals/my-deals.module').then(m => m.MyDealsPageModule)
	},
	{
		path: 'invites',
		loadChildren: () => import('./pages/invites/invites.module').then(m => m.InvitesPageModule)
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
