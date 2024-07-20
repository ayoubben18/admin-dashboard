import { ECOMErrorEnum } from "@/enums/EcomEnum";
import { ECOMError } from "@/lib/ecommerce-error";
import {
  ActionValidationError,
  createSafeActionClient,
} from "next-safe-action";

const serverActionClient = createSafeActionClient({
  handleReturnedServerError: (error) => {
    if (error instanceof ECOMError) {
      return {
        details: ECOMErrorEnum.DatabaseError,
        message: error.message,
        status: error.status,
      };
    }
    if (error instanceof ActionValidationError) {
      return {
        details: ECOMErrorEnum.ValidationError,
        message: error.message,
      };
    }
  },
  throwValidationErrors: true,
});

export { serverActionClient };
