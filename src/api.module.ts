import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { MannschaftService } from './api/mannschaft.service';
import { StatsService } from './api/stats.service';
import { TippService } from './api/tipp.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    MannschaftService,
    StatsService,
    TippService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}
