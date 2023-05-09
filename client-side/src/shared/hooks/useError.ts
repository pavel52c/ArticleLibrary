interface ErrorResponse {
  data: {
    message?: string;
  };
  status: number;
}

export const useError = (error: any): Partial<ErrorResponse> => {
  if ("data" in error)
    return {
      status: error?.status,
      data: error?.data,
    };
  return {};
};
