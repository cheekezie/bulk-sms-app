import { Pipe, PipeTransform } from '@angular/core';
import { Modify } from '../helpers/tramsform';

@Pipe({ name: 'stripunderscore' })
export class StripUnderscore implements PipeTransform {
  transform(text: string): any {
    if (text.includes('_')) {
      return text.replace(/_/g, '');
    }
    return text;
  }
}
@Pipe({ name: 'replaceunderscore' })
export class ReplaceUnderscore implements PipeTransform {
  transform(text: string): any {
    if (text && text.includes('_')) {
      return text.replace(/_/g, ' ');
    }
    return text;
  }
}

@Pipe({ name: 'ordinal' })
export class Ordinal implements PipeTransform {
  transform(number: number): string {
    let ordinalStr = '';
    if (number.toString().includes('1')) {
      ordinalStr = `${number}st`;
    } else if (number.toString().includes('2')) {
      ordinalStr = `${number}nd`;
    } else {
      ordinalStr = `${number}th`;
    }
    return ordinalStr;
  }
}

@Pipe({ name: 'time' })
export class TransformTime implements PipeTransform {
  transform(num: number): any {
    let str = '';
    if (num <= 12) {
      str = `${num}:00 AM`;
    }
    if (num > 12) {
      str = `${num - 12}:00 PM`;
    }
    return str;
  }
}

@Pipe({ name: 'dayTime' })
export class TransformDayTime implements PipeTransform {
  transform(time: string): any {
    let str = '';
    const hr = Number(time.split(':')[0]);
    const min = time.split(':')[1];
    if (hr < 12) {
      str = `${time} AM`;
    } else if (hr === 12) {
      str = `${time} PM`;
    } else {
      str = `${hr - 12}:${min} PM`;
    }
    return str;
  }
}

@Pipe({ name: 'naira' })
export class TransformToNaira implements PipeTransform {
  transform(amount: string | number | null | undefined): any {
    const amountStr = amount && amount !== 0 ? amount.toString() : '0.00';
    return '₦' + amountStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // return '₦' + amountStr.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  }
}
@Pipe({ name: 'amount' })
export class TransformAmount implements PipeTransform {
  transform(amount: string | number | null | undefined): any {
    const amountStr = amount ? amount.toLocaleString() : '0';
    return amountStr;
  }
}

@Pipe({ name: 'formatref' })
export class TransformRef implements PipeTransform {
  transform(ref: any): any {
    // return ref ? ref.match(/\d{4}(?=\d{3,4})|\d+/g).join('-') : '';
    return ref ? ref.replace(/.{4}/g, '$&-') : '';
  }
}

@Pipe({ name: 'addspace' })
export class TransformCamelCase implements PipeTransform {
  transform(str: any): any {
    if (!str) {
      return '';
    }
    const isCamelCase = /[A-Z]/.test(str);
    return isCamelCase ? str.replace(/[A-Z]/g, ' $&').trim() : str;
  }
}

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

@Pipe({ name: 'filetype' })
export class ExtractFileTypeFromPath implements PipeTransform {
  transform(url: any): any {
    if (url) {
      const format = url.split(/[#?]/)[0].split('.').pop().trim().toLowerCase();
      return format === 'png' || format === 'jpg' || format === 'jpeg'
        ? 'IMAGE'
        : format.toUpperCase();
    }
    return '';
  }
}

@Pipe({ name: 'initials' })
export class NameInitials implements PipeTransform {
  transform(name: string | null | undefined): string {
    return Modify.initials(name);
  }
}

@Pipe({ name: 'mask' })
export class MaskText implements PipeTransform {
  transform(text: string | null | undefined): string {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (text) {
      const textToMask = text.toString();
      if (regex.test(textToMask)) {
        const wordSplit = text.split('@');
        const maskAdded = Modify.maskLastFour(wordSplit[0]);
        return [maskAdded, wordSplit[1]].join('@'); // return joined word initially split with @
      } else return Modify.maskLastFour(textToMask);
    }
    return '';
  }
}
