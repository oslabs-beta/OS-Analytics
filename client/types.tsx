export type BarChartProps = {
    data: QueryData[];
    keyword: string;
  };

  export type HeatmapProps = {
    data: QueryData[];
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
  