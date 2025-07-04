import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { SearchSchoolI } from 'src/app/core/model/payment.model';
import { LocalStorageService } from 'src/app/core/services/localstore.service';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.scss',
})
export class SearchModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter();
  results: SearchSchoolI[] = [];
  schoolSearchCtrl = new FormControl('');
  searching = false;
  searchSub$: Subscription;
  private schoolLookup$: Subject<void> = new Subject();
  constructor(
    private paymentS: PaymentService,
    private router: Router,
    private localStore: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.searchSub$ = this.schoolSearchCtrl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((text: string | null) => {
          const trimmed = text?.trim() ?? '';

          // 🔹 Case: empty input
          if (trimmed.length < 2) {
            this.searching = false;
            this.results = []; // ✅ clear results immediately
            return of(null); // ✅ skip API call
          }

          // 🔹 Case: valid input
          this.searching = true;
          return this.paymentS.searchSchool(trimmed).pipe(
            catchError((err) => {
              console.error('Search failed:', err);
              this.results = [];
              this.searching = false;
              return of(null);
            })
          );
        })
      )
      .subscribe((results) => {
        if (results?.data?.organizations) {
          this.results = results.data.organizations;
        }
        this.searching = false;
      });
  }

  onSelectItem(school: SearchSchoolI) {
    this.router.navigate(['fees', school._id]);
    this.localStore.setItem('_skool', JSON.stringify(school));
  }

  onClose() {
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
    this.searchSub$?.unsubscribe();
  }
}
