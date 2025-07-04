import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private previousUrl: string | null = null;
  private currentUrl: string | null = null;
  private history: string[] = [];
  constructor(private location: Location, private router: Router) {
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
    const previousUrl = this.getPreviousUrl();
    const currentUrl = this.router.url;

    if (previousUrl && previousUrl !== currentUrl) {
      this.location.back();
    } else {
      this.router.navigate(['/']); // Or your fallback page
    }
  }
  getTermData(
    term: 'firstTerm' | 'secondTerm' | 'thirdTerm',
    schoolType: string
  ) {
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
}
