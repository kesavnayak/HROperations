import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@modules/auth/services';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-static',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './static.component.html',
    styleUrls: ['static.component.scss'],
})
export class StaticComponent implements OnInit {
    registrationForm!: FormGroup;
    closeResult = '';
    fromemail='';
    toemail='';
    ccemail='';
    ename='';
    ecode='';
    eemail='';
    username='';
    url='https://graph.microsoft.com/v1.0/me/sendMail';
    token:string|undefined='';
    clientId:string|undefined='';



  constructor(private fb: FormBuilder,private modalService: NgbModal,private http: HttpClient,private userService:UserService) {}

  ngOnInit() {
    this.initRegForm();
    this.userService.user$.subscribe(u=>{
this.token=u.token;
this.clientId=u.clientId;
    });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  send(){

    const options = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', "Bearer " + this.token)
    .set('client-request-id','a12f589d-b625-45d4-b060-569757d2e965');

const requestOptions = {  headers: options};

    const mail={
        "message": {
            "subject": "Meet for lunch?",
            //"saveToSentItems": "true",
            "body": {
                "contentType": "Text",
                "content": "The new cafeteria is open."
            },
            "toRecipients": [
                {
                    "emailAddress": {
                        "address": this.toemail
                    }
                }
            ],
            "ccRecipients": [
                {
                  "emailAddress": {
                    "address": this.ccemail
                  }
                }
              ]
        }
    };

    //return this.http.post(this.url, mail)
    return this.http.post(this.url,
        mail, requestOptions).subscribe(res=>
            {
                console.log(res)
            },
            err => {
                // Do stuff whith your error
              },);


  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  initRegForm() {
    this.registrationForm = this.fb.group({
        toemail: ["", [Validators.required, Validators.email]],
        ccemail: ["", [Validators.required, Validators.email]],
        ename: ["", Validators.required],
        ecode: ["", Validators.required],
        eemail: ["", [Validators.required,Validators.email]],
        username: ["", Validators.required]
    });
  }
}
