import * as _ from 'lodash';
import wcBetDatasource from '../config/typeorm.config';
import { User } from '../user.decorator';
import { UserMatchBetService } from '../user-match-bet/user-match-bet.service';
import { UserMatchBet } from '../model/userMatchBet.entity';
import { UserMatchBetDTO } from '../user-match-bet/user-match-bet.dto';

async function run() {
  const seedUser: User = {
    id: 'seed-user',
    email: 'seed@user.com',
    iss: 'iss',
    sub: 'seed-user',
    aud: ['1', '2'],
    iat: 1,
    exp: 1,
    azp: 'azp',
    scope: 'seed test',
    'wc-bet-api-email': 'seed@user.com',
  };

  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const connection = await wcBetDatasource.initialize();
  const userMatchBetService = new UserMatchBetService(
    connection.getRepository(UserMatchBet),
  );

  const work = _.range(1, 10)
    .map((n) =>
      UserMatchBetDTO.from({
        matchId: `match-seed${seedId}-${n}`,
        awayScore: n,
        homeScore: 10 - n,
      }),
    )
    .map((dto) =>
      userMatchBetService
        .create(dto, seedUser)
        .then((r) => (console.log('done ->', r.matchId), r)),
    );
  return await Promise.all(work);
}

run()
  .then((_) => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));
