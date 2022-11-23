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

export const canBetChamNGroups = (): boolean => {
  const now = DateTime.now().toLocal();
  const endOf1stRound = transformDateTimeToLocal('11/25/2022 15:00');
  return now >= endOf1stRound;
};

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

export enum MatchTimeElapsedEnum {
  NOT_STARTED = 'notstarted',
  FIRST_HALF = 'h1',
  HALF_TIME = 'hf',
  SECOND_HALF = 'h2',
  FINISHED = 'finished',
}

export const qatarDateTimeFormat = 'MM/d/yyyy HH:mm';
export const qatarDateTimeZone = { zone: 'Asia/Qatar' };
export const wcStartDateTime = transformDateTimeToLocal('11/20/2022 19:00');
export const ttl1min = 60 * 1000;
export const ttl5min = 300 * 1000;
export const ttl24h = 1000 * 60 * 60 * 24;
export const fifaFlag =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_FIFA.svg/1600px-Flag_of_FIFA.svg.png';
export const points = {
  group: {
    groupWinOrDraw: 10,
    groupResult: 20,
  },
};
