const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error).message === 'string'
  );
};

export const handleError = (error: unknown) => {
  if (isErrorWithMessage(error)) {
    alert(error.message);
  } else {
    alert('An unknown error occurred');
  }
  return null;
};
