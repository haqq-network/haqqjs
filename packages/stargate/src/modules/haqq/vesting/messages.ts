import { EncodeObject, GeneratedType } from "@haqqjs/proto-signing";
import { MsgCreateClawbackVestingAccount } from "@haqqjs/types/haqq/vesting/v1/tx";

export const vestingTypes: ReadonlyArray<[string, GeneratedType]> = [
  ["/haqq.vesting.v1.MsgCreateClawbackVestingAccount", MsgCreateClawbackVestingAccount],
];

export interface MsgCreateClawbackVestingAccountEncodeObject extends EncodeObject {
  readonly typeUrl: "/haqq.vesting.v1.MsgCreateClawbackVestingAccount";
  readonly value: Partial<MsgCreateClawbackVestingAccount>;
}

export function isMsgCreateClawbackVestingAccountEncodeObject(
  encodeObject: EncodeObject,
): encodeObject is MsgCreateClawbackVestingAccountEncodeObject {
  return (
    (encodeObject as MsgCreateClawbackVestingAccountEncodeObject).typeUrl ===
    "/haqq.vesting.v1.MsgCreateClawbackVestingAccount"
  );
}
