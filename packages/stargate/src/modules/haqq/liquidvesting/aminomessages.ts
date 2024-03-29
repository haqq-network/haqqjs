/* eslint-disable @typescript-eslint/naming-convention */
import { Coin, AminoMsg } from "@haqqjs/amino";
import { MsgLiquidate } from "@haqqjs/types/haqq/liquidvesting/v1/tx";
import { AminoConverters } from "../../../aminotypes";

export interface AminoMsgLiquidate extends AminoMsg {
  readonly type: "haqq/MsgLiquidate";
  readonly value: {
    readonly liquidate_from: string;
    readonly liquidate_to: string;
    readonly amount: Coin;
  };
}

export function isAminoMsgLiquidate(msg: AminoMsg): msg is AminoMsgLiquidate {
  return msg.type === "haqq/MsgLiquidate";
}

export function createLiquidVestingAminoConverters(): AminoConverters {
  return {
    "/haqq.liquidvesting.v1.MsgLiquidate": {
      aminoType: "haqq/MsgLiquidate",
      toAmino: ({ liquidateFrom, liquidateTo, amount }: MsgLiquidate): AminoMsgLiquidate["value"] => ({
        liquidate_from: liquidateFrom,
        liquidate_to: liquidateTo,
        amount: amount!,
      }),
      fromAmino: ({ liquidate_from, liquidate_to, amount }: AminoMsgLiquidate["value"]): MsgLiquidate => ({
        liquidateFrom: liquidate_from,
        liquidateTo: liquidate_to,
        amount: amount,
      }),
    },
  };
}
