# Instructions

Please follow these instructions when setting this repo up to work locally or deploying to production.

## Local setup

1. Clone or pull the repo onto your computer.
2. cd into the `pg_with_ts` directory.
3. Run the following command:
    ```
    npm ci
    ``` 
    The above has only been tested on Ubuntu. If on Mac/Windows it fails with warnings only, try step 5. regardless. If step 5. fails with errors or step 3. has failed with errors, try `npm install` followed by step 5. If everything fails - shout in chat!

4. In `./src/config/Database.ts` comment out line 22 and comment in line 26. Once done the file should look like this:

<img src="https://i.imgur.com/CZv4DkB.png" alt="local DB setup" width="700"/>

5. To start the server locally run the following command:
```
npm run start-dev
```

At this point you should see some logging in the terminal. It should look something like the image below. a new folder named `build` should have appeared in your Explorer tree.

<img src="http://i.imgur.com/jgaMDcY.png" alt="local terminal output" width="700"/>

If you see a message `Postgres alive` in the terminal, then it has worked. You are now running the backend locally on: `http://localhost:8001/`


## Deployment

1. <span style="color:red">**Revert all changes in the Database file**</span>. It is best done by discarding changes for `Database.ts` file in the source control screen.

<img src="https://i.imgur.com/nIFKlwM.png" alt="local DB setup" width="500"/>

2. Push your other changes to this repo.
3. Render should pick the new commit up by itself. It will take ~5 minutes to redeploy, take a break, make some beverage. Or, if you want to observe it deploying, then follow these instructions:

    3.1. Log into Render (credentials in #useful-links channel)

    3.2.  Open Dashboard, you should see it in Deploying status:
    <img src="https://i.imgur.com/nukvCbS.png" alt="local DB setup" width="700"/>

    3.3. Click on the service name, then click on "Logs" in the sidebar. The image below shows how a typical successful deployment looks like. If any errors come up - shout in the chat.

    <img src="https://i.imgur.com/E6HFad6.png" alt="local DB setup" width="700"/>

4. You are now running the hosted backend on: `http://nc-toolshare-backend.onrender.com/`


## Accessing the hosted DB directly

If you want to query the remote database directly, you can do so on Elephant SQL (credentials in #useful-links channel). Here you would use the common SQL statements, such as SELECT, INSERT, UPDATE, DELETE. This may come in handy when changing table structure - you may need to delete the old table manually before deploying changes (to be confirmed). Also could be useful for inserting seed data (to be determined).

To access hosted data manually, follow these steps:
1. Click on the name of the instance in ElephantSQL:
 <img src="https://i.imgur.com/ZoSVjOL.png" alt="local DB setup" width="700"/>

1. Open BROWSER from the left hand side menu, write your query into the text box and click "Execute" button.
  <img src="https://i.imgur.com/n1bQaqC.png" alt="local DB setup" width="700"/>
