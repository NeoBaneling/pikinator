import { Inator } from '../../common/inator';
import { yourMom } from './util';
import { ReplyBuilder } from '../../common/replyBuilder';

export default new Inator()
  .setName('quipinator')
  .setRandomReplies([new ReplyBuilder().setFrequency(8).setReply(yourMom)]);
