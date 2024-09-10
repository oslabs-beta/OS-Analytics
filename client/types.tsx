export type BarChartProps = {
  data: QueryData[];
  keyword: string;
};
export type ClickLogProps = {
  item: {
     element: string;
      dataset_id: string;
      x_coord: number;
      y_coord: number;
      time: string;
      user_browser: string;
      website: string;
      user_os: string;
      page_url: string;
  }
     
}

export type RadarChartProps = {
  data: QueryData[];
  keyword: string;
  keywordTwo: string;
};
export type StackedBarChart = {
  data: QueryData[];
  keyword: string;
  keywordTwo: string;
};

export type NoKeywordChart = {
  data: QueryData[];
};

export type WebsiteCounts = {
  data: QueryData[];
};

export type PieChartsProps = {
  data: QueryData[];
  keyword: string;
  keywordTwo: string;
};

export type ChartDownloadProps = {
  chartRef: { current: { toBase64Image: () => string } | null };
  fileName?: string;
}

export type QueryData = {
  element: string;
  dataset_id: string;
  time?: string;
  x_coord: number;
  y_coord: number;
  user_browser: string;
  page_url: string;
  created_at?: string;
  website_name?: string;
  [key: string]: any; //this could be anything its a keyword that the userdefines
};

export type referralData = {
  website_name?: string;
  referrer: string;
  created_at?: string;
};

export type referralBarChartProps = {
  data: referralData[];
};

export type DrawerFrequencyProps = {
  onSelectView: (view: string) => void;
  onSelectWebsite: (website: string) => void;
  onSelectPage: (page: string) => void;
};

export type FrequencyProps = {
  selectedWebsite: string;
  selectedPage: string;
};

export type AggregatedData = {
  [key: string]: {
    dataset_id: string;
    x_coord: number;
    y_coord: number;
    count: number;
  };
};

export type InteractionData = {
  dataset_id: string;
  website_name: string;
  page_url: string;
  x_coord: string;
  y_coord: string;
};
