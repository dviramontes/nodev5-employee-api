import bluebird from 'bluebird';
import express from 'express';
import request from 'request';
import redis from 'redis';
import flatten from 'flat';
import R from 'ramda';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();
const app = express();
const port = process.env.PORT || 3001;
const many = 5;

let api = express.Router();

let getKeys = () => client.keysAsync("*");

api.get('/employees/ids', (req, res) =>
    getKeys().then(keys => res.json(keys)));

api.get('/employees/:id', (req, res) => {
    let replies = [];
    client.hgetallAsync(req.params.id)
        .then(reply => replies.push(flatten.unflatten(reply)))
        .catch(err => res.send(err))
        .finally(() => res.json(replies));
});

app.use('/api', api);

app.listen(port, () => console.log(`now running on port ${port}`));

client.on('connect', () => {
    console.log('connected to redis');
    // seed redis db
    getKeys().then(keys => {
        if (keys.length !== many) {
            request(`http://api.randomuser.me/?results=${many}`,
                (err, res, body) => {
                    const {results} = JSON.parse(body);
                    R.map(e => {
                        const {salt} = e.login;
                        const flat = flatten(e);
                        const keys = R.keys(flat);
                        const vals = R.values(flat);
                        keys.forEach((e, i) => {
                            client.hset(salt, keys[i], vals[i]);
                        });
                    }, results);
                })
        }
    });
});


