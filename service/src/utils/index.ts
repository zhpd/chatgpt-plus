export interface OutputOptions<T = any> {
  code: 0 | number;
  message?: string;
  data?: T;
}

export function output<T>(options: OutputOptions<T>) {
  if (options.code === 0) {
    return Promise.resolve({
      code: options.code,
      message: options.message ?? null,
      data: options.data ?? null,
    });
  }

  return Promise.reject({
    code: options.code,
    message: options.message ?? 'Failed',
    data: options.data ?? null,
  });
}
