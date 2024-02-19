# Instructions

Please follow these instructions when setting this repo up to work locally or seploying to production

## Local setup

1. Clone or pull the repo onto your computer.
2. cd into the `pg_with_ts` directory.
3. Run the following command:
    ```
    npm ci
    ``` 
4. in `./src/config/Database.ts` comment out line 22 and comment in line 26. Once done the file should look like this:

<img src="http://imgur.com/a/ijGSiNX.png" alt="local DB setup" width="700"/>

5. To start the server locally run the following command:
```
npm run start-dev
```

At this point you should see some logging in the terminal. It should look something like the image below.

<img src="http://imgur.com/a/jxWKbK3.png" alt="local terminal output" width="700"/>

If you see a message `Postgres alive`, the it has worked. You are now running the backend locally on: `http://localhost:8001/`


## Deployment
