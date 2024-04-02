/* eslint-disable @typescript-eslint/naming-convention */
import {
  QueryClientImpl,
  QueryDenomResponse,
  QueryDenomsResponse,
} from "@haqqjs/types/haqq/liquidvesting/v1/query";

import { createProtobufRpcClient, QueryClient } from "../../../queryclient";

export interface LiquidVestingExtension {
  readonly liquidvesting: {
    denom: (denom: string) => Promise<QueryDenomResponse>;
    denoms: () => Promise<QueryDenomsResponse>;
  };
}

export function setupLiquidVestingExtension(base: QueryClient): LiquidVestingExtension {
  // Use this service to get easy typed access to query methods
  // This cannot be used for proof verification
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);

  return {
    liquidvesting: {
      denom: async (denom: string) => {
        return await queryService.Denom({ denom });
      },
      denoms: async () => {
        return await queryService.Denoms({});
      },
    },
  };
}
