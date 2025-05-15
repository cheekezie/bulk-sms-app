import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get config() {
    if (!this.isBrowser) return null;

    try {
      const hostname = window.location.hostname;
      const cookieKey = `tenant_config_${hostname}`;
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${cookieKey}=`))
        ?.split('=')[1];

      if (cookie) {
        return JSON.parse(decodeURIComponent(cookie));
      }
    } catch (err) {
      console.warn('[TenantService] Failed to parse config cookie', err);
      return {};
    }

    return null;
  }

  get getLogo(): string {
    return this.config?.logoLight || '../../../assets/images/logo-light.svg';
  }

  get getLogoLight(): string {
    return this.config?.logoLight || '../../../assets/images/logo-light.svg';
  }

  get getLogoDark(): string {
    return this.config?.logoDark || '../../../assets/images/logo-dark.svg';
  }

  get favicon(): string | null {
    return this.config?.favicon || null;
  }
  get footer() {
    return {
      name: this.config?.poweredBy || '',
      url: this.config?.poweredByUrl || '',
    };
  }
}
