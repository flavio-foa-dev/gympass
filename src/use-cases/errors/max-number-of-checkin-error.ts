export class MaxNumberOfCheckinsError extends Error {
  constructor() {
    super('Max number of checkin reached')
  }
}
