export class CheckinValidationError extends Error {
  constructor() {
    super('The checkin can only be validation until 20 minuts of its creation')
  }
}
