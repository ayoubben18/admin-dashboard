import { getSalesAmount } from "@/db/aggregations/delivery-aggregation";
import { createClient } from "@/utils/supabase/client";
import { config } from "dotenv";

describe("should pass all the aggregations tests", () => {
  it("should get the sum of prices", async () => {
    config({ path: ".env.local" });

    const supabase = createClient();

    const amount = await getSalesAmount(supabase);

    console.log(amount);
    expect(amount).toBeDefined();
  });
});
