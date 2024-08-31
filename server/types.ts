export type ClickData = {
  page_url?: string;
  website_name?: string;
  total_clicks: number;
  avg_x_coord?: number;
  avg_y_coord?: number;
};

type OpenAIChoice = {
  message: {
    role: string;
    content: string;
  };
};

export type OpenAIResponse = {
  choices: OpenAIChoice[];
};

export type JwtPayload = {
  sub?: string;
  user_id?: string;
  email?: string;
  iss?: string;
};

export type User = {
  cognito_id: string;
  email: string;
  token: string;
  user: {
    email: string;
  };
};
