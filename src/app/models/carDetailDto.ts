
export interface CarDetailDto {
    carId: number;
    brandId: number;
    colorId: number;
    carName: string;
    brandName: string;
    dailyPrice: number;
    colorName: string;
    images: string[];
    minFindeksScore: number;  // Aracın minimum Findeks puanı
  }
  