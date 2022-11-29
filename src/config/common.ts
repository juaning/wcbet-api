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
  const endOf1stRound = transformDateTimeToLocal('11/25/2022 13:00');
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
  CHAMPION = 'CHAMPION',
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
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gay_Pride_Flag.svg/2560px-Gay_Pride_Flag.svg.png';

export type IPoints = {
  [key in MatchTypeEnum]: {
    winOrDraw: number;
    result: number;
    advances?: number;
    advancesAsSecond?: number;
  };
};
export const points: IPoints = {
  [MatchTypeEnum.GROUP]: {
    winOrDraw: 10,
    result: 20,
    advances: 60,
    advancesAsSecond: 40,
  },
  [MatchTypeEnum.ROUND_OF_16]: {
    winOrDraw: 100,
    result: 100,
  },
  [MatchTypeEnum.QUARTERFINAL]: {
    winOrDraw: 150,
    result: 140,
  },
  [MatchTypeEnum.SEMIFINAL]: {
    winOrDraw: 200,
    result: 180,
  },
  [MatchTypeEnum.THIRD_PLACE]: {
    winOrDraw: 200,
    result: 180,
  },
  [MatchTypeEnum.FINAL]: {
    winOrDraw: 250,
    result: 250,
  },
  [MatchTypeEnum.CHAMPION]: {
    winOrDraw: 0,
    result: 270,
  },
};

export const lastMatchDateTimePerGroup = {
  A: '11/29/2022 20:10',
  B: '11/30/2022 00:10',
  C: '12/1/2022 00:10',
  D: '11/30/2022 20:10',
  E: '12/2/2022 00:10',
  F: '12/1/2022 20:10',
  G: '12/3/2022 00:10',
  H: '12/2/2022 20:10',
};
