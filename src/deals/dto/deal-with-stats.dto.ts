import { Deal } from '../entities/deal.entity';

export class DealWithStatsDto extends Deal {
  number_of_activations: number;
  number_of_activations_percentage: number;
}
