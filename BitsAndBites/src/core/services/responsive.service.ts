import { Injectable, inject, computed, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root',
})
export class ResponsiveService {
    private breakpointObserver = inject(BreakpointObserver);

    public isHandset = toSignal(this.breakpointObserver.observe([Breakpoints.Handset]));
    public isTablet = toSignal(this.breakpointObserver.observe([Breakpoints.Tablet]));

    public isMobile = computed(() => (this.isHandset()?.matches || this.isTablet()?.matches) ?? false);
    public isDesktop = computed(() => !this.isMobile());
    
}