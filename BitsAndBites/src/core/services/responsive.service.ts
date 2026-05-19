import { Injectable, inject, computed, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root',
})
export class ResponsiveService {
    private breakpointObserver = inject(BreakpointObserver);

    public isMobile = signal(false);
    
    
}