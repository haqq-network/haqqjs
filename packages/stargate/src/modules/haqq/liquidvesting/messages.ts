/* eslint-disable @typescript-eslint/naming-convention */
import { EncodeObject, GeneratedType } from "@haqqjs/proto-signing";
import { MsgLiquidate } from "@haqqjs/types/haqq/liquidvesting/v1/tx";

export const haqqLiquidvestingTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/haqq.liquidvesting.v1.MsgLiquidate", MsgLiquidate],
];

export interface MsgLiquidateEncodeObject extends EncodeObject {
  readonly typeUrl: "/haqq.liquidvesting.v1.MsgLiquidate";
  readonly value: Partial<MsgLiquidate>;
}

export function isMsgLiquidateEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgLiquidateEncodeObject {
  return (encodeObject as MsgLiquidateEncodeObject).typeUrl === "/haqq.liquidvesting.v1.MsgLiquidate";
}
