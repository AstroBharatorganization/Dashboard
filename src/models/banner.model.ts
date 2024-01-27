export interface Banner {
  firstBanner: File | null;
  secondBannerList: FileList | null;
  homeBannerText: string;
  bannerTitle: string;
}

export interface GetFirstBanner {
  status: number;
  message: string;
  data: string;
  success: boolean;
}

export interface GetSecondBannerList {
  status: number;
  message: string;
  data: string[];
  success: boolean;
}

export interface GetBannerText {
  status: number;
  message: string;
  data: {
    title: string;
    description: string;
  };
  success: boolean;
}

export interface GetBannerTitle {
  status: number;
  message: string;
  data: {
    title: string;
  };
  success: boolean;
}
