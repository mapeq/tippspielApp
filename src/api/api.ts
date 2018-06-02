export * from './mannschaft.service';
import { MannschaftService } from './mannschaft.service';
export * from './stats.service';
import { StatsService } from './stats.service';
export * from './tipp.service';
import { TippService } from './tipp.service';
export const APIS = [MannschaftService, StatsService, TippService];
