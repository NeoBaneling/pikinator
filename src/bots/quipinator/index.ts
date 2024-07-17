import { Inator } from '../../common/inator';
import { sheSaid, yourMom } from './util';
import { ReplyBuilder } from '../../common/replyBuilder';

export default new Inator()
  .setName('quipinator')
  .setRandomReplies([
    new ReplyBuilder().setFrequency(16).setThreshold(3).setReply(yourMom),
    new ReplyBuilder().setFrequency(16).setThreshold(3).setReply(sheSaid),
  ]);
