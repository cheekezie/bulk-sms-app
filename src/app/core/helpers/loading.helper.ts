import { LoadingDataI, LoadingService } from '../services/loading.service';

export class Loading {
  private static service: LoadingService;

  static registerService(service: LoadingService) {
    this.service = service;
  }

  static show(data?: LoadingDataI) {
    if (!this.service) {
      console.error('Loading service not registered!');
      return;
    }
    this.service.toggleLoading({ ...data, show: true });
  }

  static hide() {
    if (!this.service) {
      console.error('Loading service not registered!');
      return;
    }
    this.service.toggleLoading({ show: false });
  }
}
