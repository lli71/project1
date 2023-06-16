import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { isDefined, NavItem } from '@slb-dls/angular-material/shared';
import { SlbNotificationItem } from '@slb-dls/angular-material/notifications-panel';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnDestroy {
    notificationCount: number =  10;
    notificationItems: SlbNotificationItem[] = [];

    showHeader: boolean = true;
    pageTitle: string = '';
    secondaryLinks: NavItem[] = [
        {
            'label': 'Default',
            'routerLink': [
                '',
                'home',
            ],
        },
        {
            'label': 'Page 1',
            'routerLink': [
                '',
                'notifications',
            ],
        },
        {
            'label': 'Page 2',
            'routerLink': [
                '',
                'themes',
            ],
        },
        {
            'label': 'Page 3',
            'routerLink': [
                '',
                'notifications',
            ],
        },
    ];

    private routerSubscription = Subscription.EMPTY;

    constructor(
        router: Router,
        matIconRegistry: MatIconRegistry,
        domSanitizer: DomSanitizer
    ) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg-symbols.svg'));

        this.routerSubscription = router.events.pipe(
            filter(e => e instanceof RoutesRecognized),
            map(e => e as RoutesRecognized))
        .subscribe(e => this.onRouteChange(e));
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }

    private onRouteChange(event: RoutesRecognized): void {
        const data: any = event.state.root.firstChild?.data;
        this.showHeader = isDefined(data.showHeader) ? data.showHeader : true;
        this.pageTitle = data.title;
    }
}
