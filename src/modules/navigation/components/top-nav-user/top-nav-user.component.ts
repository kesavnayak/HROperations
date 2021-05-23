import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    isLoggedIn:boolean=false;
    constructor(public userService: UserService) {}
    ngOnInit() {

    }

    login(){
        this.userService.login();
    }

    logout(){
        this.userService.logout();
    }

}
