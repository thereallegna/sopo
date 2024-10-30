interface BasicResponse<T> {
  status?: string;
  message?: string;
  data: T;
}

interface ApiPaginationResponse {
  current_page: number;
  page_size: number;
  total_records?: number;
  total_pages?: number;
  has_next?: boolean;
  has_previous?: boolean;
}

interface ApiResultResponse<T> extends ApiPaginationResponse {
  results: T;
}

type ApiResponse<T> = BasicResponse<ApiResultResponse<T>>;
