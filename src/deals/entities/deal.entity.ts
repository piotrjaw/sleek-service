export class Deal {
  deal_id: string;
  retailer_id: string;
  retailer_name: string;
  retailer_domains: string[];
  deal_type: string;
  deal_amount: number;
  activated?: Date;
}
