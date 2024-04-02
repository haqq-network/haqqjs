/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-non-null-assertion */
import { AminoMsg } from "@haqqjs/amino";
import { Period } from "@haqqjs/types/cosmos/vesting/v1beta1/vesting";
import { Timestamp } from "@haqqjs/types/google/protobuf/timestamp";
import { MsgCreateClawbackVestingAccount } from "@haqqjs/types/haqq/vesting/v1/tx";

import { AminoConverters } from "../../../aminotypes";

export interface AminoMsgCreateClawbackVestingAccount extends AminoMsg {
  readonly type: "haqq/MsgCreateClawbackVestingAccount";
  readonly value: {
    readonly from_address: string;
    readonly to_address: string;
    readonly start_time: Timestamp;
    readonly lockup_priods: Period[];
    readonly vesting_periods: Period[];
    readonly merge: boolean;
  };
}

export function isAminoMsgCreateClawbackVestingAccount(
  msg: AminoMsg,
): msg is AminoMsgCreateClawbackVestingAccount {
  return msg.type === "haqq/MsgCreateClawbackVestingAccount";
}

export function createLiquidVestingAminoConverters(): AminoConverters {
  return {
    "/haqq.vesting.v1.MsgCreateClawbackVestingAccount": {
      aminoType: "haqq/MsgLiquidate",
      toAmino: ({
        fromAddress,
        toAddress,
        startTime,
        lockupPeriods,
        vestingPeriods,
        merge,
      }: MsgCreateClawbackVestingAccount): AminoMsgCreateClawbackVestingAccount["value"] => ({
        from_address: fromAddress,
        to_address: toAddress,
        start_time: startTime!,
        lockup_priods: lockupPeriods,
        vesting_periods: vestingPeriods,
        merge,
      }),
      fromAmino: ({
        from_address,
        to_address,
        start_time,
        lockup_priods,
        vesting_periods,
        merge,
      }: AminoMsgCreateClawbackVestingAccount["value"]): MsgCreateClawbackVestingAccount => ({
        fromAddress: from_address,
        toAddress: to_address,
        startTime: start_time,
        lockupPeriods: lockup_priods,
        vestingPeriods: vesting_periods,
        merge,
      }),
    },
  };
}
