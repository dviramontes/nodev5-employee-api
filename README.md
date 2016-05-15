# A Node Employee API

Uses **http://api.randomuser.me** to seed employee data.


## Employee API Endpoints:

### Listing:
#### GET `/api/employees/ids`

### Lookup:
#### GET `/api/employees/:id`

### Adding:
#### POST `/api/employees`

with json payload content-type: `application/json`: 

	
	{
		"id": "ysOGW5t0""
		"details" : {
			...
		}
	}
	


### Editing:
#### PUT `/api/employees/:id`

with json payload content-type: `application/json`:
	 
	
	{
		"modified_details" : {
			...
		}
	}
	

### Deleting:
#### DELETE `/api/employees/:id`

---


## Requirements:

- Redis 

	`brew install redis`

- Node v5 or newer

	`nvm install v5`
	
	`nvm use v5`

## Running:

`redis-server`

then:

`npm start`

Server runs on **localhost:3000**


## Clearing Redis DB:

with redis-server running launch the redis-cli from terminal:

`redis-cli`	

then:

`flushall`

## Development:

`npm run dev`

## Tests:

`npm test`


