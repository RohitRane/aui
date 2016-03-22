export class PageHeaderController {
  constructor (moment) {
    'ngInject';

    // "this.creation" is available by directive option "bindToController: true"
    this.relativeDate = moment(this.creationDate).fromNow();
  }
}