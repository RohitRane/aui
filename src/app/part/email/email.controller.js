export class EmailController {
    constructor($uibModalInstance, $document, dataServices, url) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({ dataServices, url });

        setTimeout(()=>{
            $document[0].getElementById("toEmails").multiple = true;
        },2000);
        
        vm.subject = "XYZ has shared this product with you : " + url;
        /*vm.from = "rohit.rane@phasezeroventures.com";
        vm.to = ["rohit.rane@happiestminds.com", "rohitrane4@gmail.com"];*/
        vm.body = "ABCD";
    }

    send() {
        let vm = this;
        let {dataServices, url} = vm.DI();
        dataServices.emailPart(url, vm.from, vm.to, vm.subject, vm.body).then((response)=>{
        },(error)=>{

        });
    }
}
