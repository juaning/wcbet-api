/**
 * Common variables, enums and functions shared across different modules
 */
import { DateTime } from 'luxon';

export const transformDateTimeToLocal = (datetime: string) =>
  DateTime.fromFormat(
    datetime,
    qatarDateTimeFormat,
    qatarDateTimeZone,
  ).toLocal();

export enum TeamBetTypeEnum {
  CHAMPION,
  THIRD_PLACE,
  SEMIFINAL,
  QUARTERFINAL,
  ROUND_OF_16,
  GROUP_WINNER,
  GROUP_SECOND,
}

export enum MatchTypeEnum {
  GROUP = 'group',
  ROUND_OF_16 = 'R16',
  QUARTERFINAL = 'QR',
  THIRD_PLACE = '3RD',
  SEMIFINAL = 'SF',
  FINAL = 'FIN',
}

export const qatarDateTimeFormat = 'MM/d/yyyy HH:mm';
export const qatarDateTimeZone = { zone: 'Asia/Qatar' };
export const wcStartDateTime = transformDateTimeToLocal('11/20/2022 19:00');
