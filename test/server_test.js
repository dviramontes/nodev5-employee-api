import supertest from 'supertest';
import sinon from 'sinon';
import when from 'when';
import server from '../server/app';

describe('Employee API', () => {

    let client;
    let employee = '63yixLLr';
    const fakeEmployee = {
        id: '63yixLLr',
        gender: 'female',
        name: {title: 'ms', first: 'beatrice', 'last': 'tremblay'},
        email: 'beatrice.tremblay@example.com',
        login: {
            username: 'purpleostrich974',
            password: 'sailor',
            salt: '63yixLLr'
        },
        dob: '482753313',
        picture: 'url'
    };

    beforeEach(() => {
        client = server.client;
        client.keysAsync = function () {
        };
        client.hgetallAsync = function () {
        };
        sinon.stub(client, 'keysAsync').returns(when(['12345', 'abcde', 'foobar']));
        sinon.stub(client, 'hgetallAsync').returns(when(fakeEmployee));
    });

    it('should respond to api/employees/ids request with list of ids', (done) => {
        supertest(server)
            .get('/api/employees/ids')
            .set('Accept', 'application/json')
            .expect(200, ['12345', 'abcde', 'foobar'], done);
    });

    it('should respond to api/employees/:id request with employee data', (done) => {
        supertest(server)
            .get('/api/employees/' + employee)
            .set('Accept', 'application/json')
            .expect(200, [fakeEmployee], done);
    });

    it('should respond to api/employees/ request to create employee', (done) => {
        supertest(server)
            .post('/api/employees')
            .set('Accept', 'application/json')
            .send(fakeEmployee)
            .expect(200, `Employee ${employee} successfully added.`, done);
    });

    it('should respond to api/employees/:id request to edit employee data', (done) => {
        supertest(server)
            .put('/api/employees/' + employee)
            .set('Accept', 'application/json')
            .send(fakeEmployee)
            .expect(200, `Employee ${employee} successfully updated.`, done);
    });

    it('should respond to api/employees/:id request to edit employee data', (done) => {
        supertest(server)
            .put('/api/employees/' + employee)
            .set('Accept', 'application/json')
            .send(fakeEmployee)
            .expect(200, `Employee ${employee} successfully updated.`, done);
    });

    it('should respond to api/employees/:id request to delete employee', (done) => {
        supertest(server)
            .delete('/api/employees/' + employee)
            .set('Accept', 'application/json')
            .expect(200, `Employee ${employee} successfully deleted.`, done);
    });

});