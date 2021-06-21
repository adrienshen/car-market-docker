import logger from "../logger";
import { BaseError } from "./BaseError";

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    await logger.error(
      'Error message from the centralized error-handling component',
      err
    );
    // Some tasks we might want to do here...
    // TODO: implement await sendMailToAdminIfCritical();
    // TODO: implement await sendEventsToSentry();
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export default new ErrorHandler();
