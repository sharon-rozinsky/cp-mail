export class MailContent {
    constructor(
        public _id: string,
        public sender: string,
        public subject: string,
        public recepients: string,
        public dateReceived: string,
        public description: string,
        public body: string,
        public bodyHtml: string,
        public isRead: boolean,
        public isSelected: boolean) {
    }
}
