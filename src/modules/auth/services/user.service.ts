import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    constructor(private msalService:MsalService) {
    }

    login(){
        this.msalService.loginPopup().subscribe((res:AuthenticationResult)=>{
            this.msalService.instance.setActiveAccount(res.account);



            if(this.msalService.instance.getAllAccounts() != null && this.msalService.instance.getAllAccounts().length > 0)
        {
            this.user = {
                    id: res.account?.homeAccountId,
                    name: res.account?.name ,
                    email: res.account?.username,
                    token:res.accessToken,
                    tanentId:res.tenantId,
                    clientId:res.tenantId
                };
        }
        });
    }

    logout(){
        this.msalService.logout();
    }

    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }
}
