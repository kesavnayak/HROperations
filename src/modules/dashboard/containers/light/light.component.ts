import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@modules/auth/services';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-light',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './light.component.html',
    styleUrls: ['light.component.scss'],
})
export class LightComponent implements OnInit {
    irmForm!: FormGroup;
    closeResult = '';
    toemail='';
        ccemail='';
        irmname='';
        irmdesg="";
        ename="";
        edoj:any='';
        eskill="";
        ecert="";
        ebaseloc="";
        ejoinloc="";
        ephone="";
        etotalexp="";
        erelexp="";
        eemail="";
    url='https://graph.microsoft.com/v1.0/me/sendMail';
    token:string|undefined='';
    clientId:string|undefined='';



  constructor(private fb: FormBuilder,private modalService: NgbModal,private http: HttpClient,private userService:UserService) {
  }

  ngOnInit() {
    this.initRegForm();
    this.userService.user$.subscribe(u=>{
this.token=u.token;
this.clientId=u.clientId;
    });
  }

  open(content: any) {
      
      this.edoj=JSON.stringify(this.edoj);
      this.edoj=JSON.parse(this.edoj);

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
            () => {
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
    this.irmForm = this.fb.group({
        toemail: ["", [Validators.required, Validators.email]],
        ccemail: ["", [Validators.required, Validators.email]],
        irmname: ["", Validators.required],
        irmdesg: ["", Validators.required],
        ename: ["", Validators.required],
        edoj: [null, Validators.required],
        eskill: ["", Validators.required],
        ecert: ["", Validators.required],
        ebaseloc: ["", Validators.required],
        ejoinloc: ["", Validators.required],
        ephone: ["", Validators.required],
        etotalexp: ["", Validators.required],
        erelexp: ["", Validators.required],
        eemail: ["", [Validators.required,Validators.email]],
    });
  }
}
