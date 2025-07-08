import { firstValueFrom, Subject } from 'rxjs';
import { ModalDataI, ModalService } from '../services/modal.service';

export class Modal {
  private static service: ModalService;

  static registerService(service: ModalService) {
    this.service = service;
  }

  static async show<R = any>(data: ModalDataI): Promise<{ result: R }> {
    if (!this.service) {
      throw new Error('ModalService not registered!');
    }

    const response$ = new Subject<R>();
    this.service.showModal({
      ...data,
      response$,
    });

    const result = await firstValueFrom(response$);
    return { result };
  }

  static dismiss<R = any>(data?: R) {
    this.service?.closeModal(data);
  }
}
