// TODO(mmalerba): Remove when we no longer support safari 9.
/** Whether the browser supports the Intl API. */
import { NativeDateAdapter } from '@angular/material';


/** Adapts the native JS Date for use with cdk-based components that work with dates. */
export class CustomAdapterDateformat extends NativeDateAdapter {
  parse(value: any, parseFormat: Object): Date | null {
    // We have no way using the native JS Date to set the parse format or locale, so we ignore these
    // parameters.
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');
      value = (Number(str[2])-543) + '-'  + str[1] + '-' + str[0];
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }
}