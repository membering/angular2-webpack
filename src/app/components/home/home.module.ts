import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from './card/card.module';
import { ContactModule } from './contact/contact.module';

import { HomeComponent } from './index';
import { SidebarDirective } from '../../_directives/index';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './user/index';

@NgModule({
    imports: [
    	RouterModule,
        BrowserModule,
        FormsModule, ReactiveFormsModule,
        CardModule,
        ContactModule
    ],
    declarations: [
        HomeComponent,
        SidebarDirective,
        DashboardComponent,
        ProfileComponent
    ],
    bootstrap: [ HomeComponent ]
})

export class HomeModule { }
