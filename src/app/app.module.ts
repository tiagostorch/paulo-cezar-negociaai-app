import { DecimalPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePtBR from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertService } from './services/alert.service';
import { BidService } from './services/bid.service';
import { DealService } from './services/deal.service';
import { DeviceService } from './services/device.service';
import { EventService } from './services/event.service';
import { RequestService } from './services/request.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';

//https://angular.io/guide/i18n#i18n-pipes
registerLocaleData(localePtBR);

@NgModule({
	declarations: [
		AppComponent
	],
	entryComponents: [],
	imports: [
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		IonicModule.forRoot({
			backButtonText: '',
		}),
		IonicStorageModule.forRoot({
			name: 'app_negocia_ai'
		})
	],
	providers: [
		AlertService,
		BidService,
		Camera,
		DecimalPipe,
		Diagnostic,
		DealService,
		DeviceService,
		EventService,
		Geolocation,
		LocationAccuracy,
		StorageService,
		RequestService,
		UserService,
		WebView,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{ provide: LOCALE_ID, useValue: "pt" }
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
