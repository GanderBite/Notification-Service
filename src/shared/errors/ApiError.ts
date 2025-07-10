export class ApiError<TDetails = string> extends Error {
  constructor(
    public readonly statusCode = 500,
    public message = 'Internal server error occured.',
    public readonly details?: TDetails,
  ) {
    super(message);
    this.name = new.target.name;
  }
}
