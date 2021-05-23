import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function MSALInstanceFactory():IPublicClientApplication{
    return new PublicClientApplication({
        auth:{
            clientId:'a12f589d-b625-45d4-b060-569757d2e965',
            redirectUri:'http://localhost:4200'
        }
    });
}

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule,MsalModule],
    providers: [{ provide:MSAL_INSTANCE,useFactory:MSALInstanceFactory},MsalService],
    bootstrap: [AppComponent],
})
export class AppModule {}
