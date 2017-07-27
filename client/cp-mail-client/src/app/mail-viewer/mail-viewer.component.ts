import { Component, OnInit } from '@angular/core';
import { MailContent } from './mail-content.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-mail-viewer',
  templateUrl: './mail-viewer.component.html',
  styleUrls: ['./mail-viewer.component.css']
})
export class MailViewerComponent implements OnInit {
  emailDescriptions: Array<MailContent> = [];
  selectedEmail: MailContent;
  currentUserAddress: string;

  constructor(private route: ActivatedRoute, private http: Http) {
    route.params.subscribe(params => { this.currentUserAddress = params['email']; });
    console.log('current email: ' + this.currentUserAddress);
    this.fetchEmails();


    // mock data
    /*this.mailDescriptions = [
      new MailContent('avatarUrl', 'Sharon', 'subject', 'a@a.com', '3:56pm, April 3, 2012', 'some description', 'body1', false, false),
      new MailContent('avatarUrl2', 'Sharon2', 'subject2', 'a@a.com, b@b.com', '3:56pm, April 3, 2012',
      'some description2', 'body2', false, false),
      new MailContent('avatarUrl3', 'Sharon3', 'subject3', 'c@c.com, b@b.com', '3:56pm, April 3, 2012',
      'some description3', 'body3', false, false)
    ];*/
  }

  fetchEmails(): void {
    let emails: any[];

    this.http.get('http://sharon.sealdoc.com:3000/' + this.currentUserAddress + '/mail')
      .subscribe((res: Response) => {
        emails = res.json();

        emails.forEach(email => this.emailDescriptions.push(
          new MailContent(email._id, email.sender, email.subject, email.recepients, email.dateReceived,
            email.description, email.body, email.bodyHtml, email.isRead, email.isSelected))
        );

        console.log(emails);
        console.log('recevied emails for user: ' + this.currentUserAddress + '\n' + emails);
      });
  }

  clicked(mail: MailContent): void {
    if (this.selectedEmail) {
      this.selectedEmail.isSelected = false;
    }
    this.selectedEmail = mail;
    this.selectedEmail.isSelected = true;

    if (!this.selectedEmail.isRead) {
      this.selectedEmail.isRead = true;
      this.updateMailReadStatus(true);
    }
  }

  updateMailReadStatus(status: boolean): void {
    this.http.post('http://sharon.sealdoc.com:3000/mail/status/update',
      {
        _id: this.selectedEmail._id,
        status: status
      })
      .subscribe((res: Response) => {
        console.log(res);
      });
  }

  ngOnInit() {
  }
}
