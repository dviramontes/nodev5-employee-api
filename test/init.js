import redis from 'redis';
import fakeRedis from 'fakeredis';
import sinon from 'sinon';

sinon.stub(redis, 'createClient', fakeRedis.createClient);
