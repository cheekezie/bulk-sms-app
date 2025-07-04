import { AlertDataI, AlertService } from '../services/alert.service';

export class Alert {
  private static service: AlertService;

  static registerService(service: AlertService) {
    this.service = service;
  }

  static show(data: AlertDataI) {
    if (!this.service) {
      console.error('CustomAlert service not registered!');
      return;
    }
    this.service.showAlert(data);
  }
}
