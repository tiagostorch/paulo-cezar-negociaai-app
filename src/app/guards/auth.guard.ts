import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private navController: NavController,
		private userService: UserService
	) { }

	async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		let user: User = null;
		try {
			user = await this.userService.loadUser();
		} catch (e) {
			console.log(e);
		}
		if (!user) {
			this.navController.navigateForward("/login", { replaceUrl: true });
			return false;
		}
		return true;
	}
}
