import should from 'should';
import chai from 'chai';
import supertest from 'supertest';
import nock from 'nock';
import server from '../server/app';

nock.recorder.rec({
    dont_print: false
});

describe('Employee API', () => {

    beforeEach(() => {
        nock('http://api.randomuser.me')
            .get('/')
            .reply(200, {
                results: [{results: []}]
            });
    });

    it('responds to /employees/ids request with list of ids', function (done) {
        supertest(server)
            .get('/api/employees/ids')
            .set('Accept', 'application/json')
            .expect(200, []
                , done);
    });

});