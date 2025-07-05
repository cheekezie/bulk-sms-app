import { isPlatformBrowser, Location } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TermEnums } from '../model/enums';
import { Alert } from '../helpers/alert.helper';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;
  private history: string[] = [];
  constructor(
    private location: Location,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  private getHistory(): string[] {
    return this.history;
  }

  private getPreviousUrl(): string | null {
    return this.history.length > 1
      ? this.history[this.history.length - 2]
      : null;
  }

  goBack() {
    if (isPlatformBrowser(this.platformId) && window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  getTermData(term: TermEnums, schoolType: string) {
    const isTertiary = schoolType === 'tertiary';

    const labels = {
      firstTerm: {
        type: isTertiary ? 'semester' : 'term',
        no: 1,
        title: isTertiary ? 'First Semester' : 'First Term',
      },
      secondTerm: {
        type: isTertiary ? 'semester' : 'term',
        no: 2,
        title: isTertiary ? 'Second Semester' : 'Second Term',
      },
      thirdTerm: {
        type: 'term',
        no: 3,
        title: 'Third Term',
      },
    };

    return labels[term] || null;
  }

  cleanObject<T extends object>(obj: T): Partial<T> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        !(typeof value === 'string' && value.trim() === '')
      ) {
        acc[key as keyof T] = value;
      }
      return acc;
    }, {} as Partial<T>);
  }

  copy(value: string | number = '') {
    const val = value.toString();
    navigator.clipboard
      .writeText(val)
      .then(() => {
        Alert.show({
          description: `${val} copied to clipboard`,
          type: 'info',
          position: 'bottom-center',
        });
      })
      .catch((err) => {});
  }
}
