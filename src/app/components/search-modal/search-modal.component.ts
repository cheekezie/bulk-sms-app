import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
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
import { StudentI } from 'src/app/core/model/student.mode';
import { LocalStorageService } from 'src/app/core/services/localstore.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { TenantService } from 'src/app/core/services/tenant.service';

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
  schoolResults: SearchSchoolI[] = [];
  studentResults: StudentI[] = [];
  schoolSearchCtrl = new FormControl('');
  studentSearchCtrl = new FormControl('');
  searching = false;
  isEmpty = false;
  searchSub$: Subscription;
  private schoolLookup$: Subject<void> = new Subject();
  view: 'school' | 'student' = 'school';

  constructor(
    private paymentS: PaymentService,
    private router: Router,
    private tenant: TenantService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private localStore: LocalStorageService
  ) {}

  get isDefaulTenant() {
    return this.tenant.config.isDefault;
  }
  ngOnInit(): void {
    this.renderer.addClass(this.document.body, 'no-scroll');

    this.searchSub$ = this.schoolSearchCtrl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((text: string | null) => {
          const trimmed = text?.trim() ?? '';

          // 🔹 Case: empty input
          if (trimmed.length < 2) {
            this.searching = false;
            this.schoolResults = []; // ✅ clear results immediately
            return of(null); // ✅ skip API call
          }

          // 🔹 Case: valid input
          this.searching = true;
          this.isEmpty = false;
          return this.paymentS.searchSchool(trimmed).pipe(
            catchError((err) => {
              console.error('Search failed:', err);
              this.schoolResults = [];
              this.searching = false;
              this.isEmpty = true;
              return of(null);
            })
          );
        })
      )
      .subscribe((results) => {
        if (results?.data?.organizations) {
          this.schoolResults = results.data.organizations;
          this.isEmpty = !results.data.organizations.length;
        }
        this.searching = false;
      });

    // Search Student With Reg Number
    this.searchSub$ = this.studentSearchCtrl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((text: string | null) => {
          const trimmed = text?.trim() ?? '';

          // 🔹 Case: empty input
          if (trimmed.length < 2) {
            this.searching = false;
            this.studentResults = []; // ✅ clear results immediately
            return of(null); // ✅ skip API call
          }

          // 🔹 Case: valid input
          this.searching = true;
          return this.paymentS.searchStudents(trimmed).pipe(
            catchError((err) => {
              console.error('Search failed:', err);
              this.studentResults = [];
              this.searching = false;
              return of(null);
            })
          );
        })
      )
      .subscribe((results) => {
        if (results?.data?.data) {
          this.studentResults = results.data.data;
        }
        this.searching = false;
      });
  }

  onSelectSchool(school: SearchSchoolI) {
    this.router.navigate(['fees', school._id]);
    this.localStore.setItem('_skool', JSON.stringify(school));
  }

  onSelectStudent(student: StudentI) {
    this.router.navigate(['fees', student.organization._id]);
    this.localStore.setItem('_skool', JSON.stringify(student.organization));
  }

  onClose() {
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
    this.searchSub$?.unsubscribe();
    this.renderer.removeClass(this.document.body, 'no-scroll');
  }
}
