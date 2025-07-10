import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Modal } from 'src/app/core/helpers/modal.helper';
import { ModalDataI, ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modalContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  componentRef: ComponentRef<any> | null = null;
  modalClass = '';
  title = '';
  isOpen = false;

  private sub!: Subscription;
  private pendingConfig: ModalDataI | null = null;

  constructor(private modalService: ModalService) {}

  ngAfterViewInit() {
    this.sub = this.modalService.modal$.subscribe((config: ModalDataI) => {
      this.pendingConfig = config;
      this.isOpen = true;

      // Wait for view to render before creating the component
      setTimeout(() => {
        this.injectComponent();
      });
    });

    // 🔔 Listen to close signal from service
    this.modalService.closeModal$.subscribe(() => {
      this.onCleanUp();
    });
  }

  injectComponent() {
    if (!this.container || !this.pendingConfig) return;

    this.container.clear();

    const config = this.pendingConfig;
    const compRef = this.container.createComponent(config.component);

    if (config.componentProps) {
      Object.entries(config.componentProps).forEach(([key, value]) => {
        compRef.setInput(key, value);
      });
    }

    this.componentRef = compRef;
    this.modalClass = config.modalClass || '';
    this.title = config.title || '';
  }

  onClose() {
    Modal.dismiss(null);
  }

  // trigger internal cleanup
  onCleanUp() {
    this.isOpen = false;
    this.componentRef?.destroy();
    this.componentRef = null;
    this.sub?.unsubscribe();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
