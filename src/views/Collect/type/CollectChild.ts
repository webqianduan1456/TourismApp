export interface CollectChild {
  id: number;
  productPrice: number;
  houseId: number;
  text: string;
  houseName: string;
  commentScore: string;
  summaryText: string;
  location: string;
  finalPrice: number;
  url: string | null;
  discoveryContentType: number;
  Suggestion: string;
  Discount: string;
  Discount1: string;
  Discount2: string;
  DiscountMessage: string;
  Comment: number;
  flay: number;
  houseKeyimg: Array<{
    orderIndex: number;
    title: string;
    orderSum: number;
    cityId: number;
    houseimg: Array<{
      id: number;
      url: string;
    }>;
  }>;
}
