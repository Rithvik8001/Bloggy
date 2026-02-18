export class AppError extends Error {
  readonly statusCode: number;
  readonly error: string;
  readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number,
    errorLabel?: string,
    details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.error = errorLabel ?? "Error";
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, "Bad request", details);
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401, "Unauthorized");
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 400, "Validation failed", details);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 500, "Internal server error", details);
    this.name = "InternalServerError";
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
