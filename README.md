# Instructions

Please follow these instructions when setting this repo up to work locally or deploying to production.

## Local setup

1. Clone or pull the repo onto your computer.
1. cd into the `pg_with_ts` directory.
1. Run the following command:
    ```
    npm ci
    ``` 
    The above has only been tested on Ubuntu. If on Mac/Windows it fails with warnings only, try step 5. regardless. If step 5. fails with errors or step 3. has failed with errors, try `npm install` followed by step 5. If everything fails - shout in chat!

1. In `./src/config/Database.ts` comment out line 23 and comment in line 27. Once done the file should look like this:

    <img src="https://i.imgur.com/CZv4DkB.png" alt="local DB setup" width="700"/>

1. IF you have not created the local database before or if any models in the database have been changed, open another terminal and run the command below. You will need to re-seed the local database, if you do this (it is described below). Otherwise, skip to the next step.
    ```
    psql -f ./src/db/setup.sql
    ``` 

    You should see output: `DROP DATABASE CREATE DATABASE`

1. To start the server locally run the following command:
    ```
    npm run start-dev
    ```

    At this point you should see some logging in the terminal. It should look something like the image below. A new folder named `build` should have appeared in your Explorer tree.

    <img src="http://i.imgur.com/jgaMDcY.png" alt="local terminal output" width="700"/>

    If you see a message `Postgres alive` in the terminal, then it has worked. You are now running the backend locally on: `http://localhost:8001/`

1. IF you ran the setup test (see above), then you will need to re-seed your local database. To do this, in another terminal window (not the one where server is running) run the following command:
    ```
    psql -f ./src/db/seed_dev/ProfileSeed.sql
    psql -f ./src/db/seed_dev/ListingSeed.sql
    ```
    You will see many `INSERT 0 1` statements appear in the console.

You should now be all set up for work. You can use your favourite API platform to query the database. Docs are here: http://localhost:8001/api/docs If you use Insomnia, there is a file named `Insomnia_endpoints.json` in the repo that you can import into Insomnia for a set of pre-defined calls to all available endpoints (use `Localhost` folder).


## Deployment

1. Shout in the #backend-status channel that you are going to redeploy the backend and give people some 5 minutes grace period to notice your message and shout back if they are in the middle of something important and need connection to the hosted DB for what they are doing with it. If noone responds, go ahead with the instructions below.

1. <span style="color:red">**Revert changes to the host in the Database file**</span>.

    1.1. If you have not added any new models, then reverting changes is best done by discarding changes for `Database.ts` file in the source control screen.

    <img src="https://i.imgur.com/nIFKlwM.png" alt="local DB setup" width="500"/>

    1.2. IF you have added new models, revert the changes to host and uri in the `Database.ts` file manually. **If you only changed models that already existed, discard all changes to `Database.ts` file, as per above**

1. IF you changed any of the models, you will need to drop them from the hosted database. Otherwise proceed to the next step.
    
    3.1. Log into ElephantSQL (credentials in the #useful-links channel).
    
    3.2. Click on `toolshare` instance name.

    3.3. Click on BROWSER in the left hand side pane.

    3.4. In the text box input a DROP query for model/table that you changed and hit Execute. Repeat for each model:

    ```
    DROP TABLE model_name;
    ```
    3.5. You will need to reseed the tables that were dropped, see instructions below.

1. Push your other changes to this repo.
1. Render should pick the new commit up by itself. It will take ~5 minutes to redeploy, take a break, make some beverage. Or, if you want to observe it deploying, then follow these instructions:

    5.1. Log into Render (credentials in #useful-links channel)

    5.2.  Open Dashboard, you should see it in Deploying status:
    <img src="https://i.imgur.com/nukvCbS.png" alt="local DB setup" width="700"/>

    5.3. Click on the service name, then click on "Logs" in the sidebar. The image below shows how a typical successful deployment looks like. If any errors come up and you don't know what to do about them - shout in the chat.

    <img src="https://i.imgur.com/E6HFad6.png" alt="local DB setup" width="700"/>

1. You are now running the hosted backend on: `http://nc-toolshare-backend.onrender.com/` Try to connect to this address, it should say `welcome home`. Docs are here: http://nc-toolshare-backend.onrender.com/api/docs If you use Insomnia, there is a file named `Insomnia_endpoints.json` in the repo that you can import into Insomnia for a set of pre-defined calls to all available endpoints (use `Hosted` folder).

1. IF you changed any of the models and deleted them prior to re-deployment, you will need to reseed those models with data. Copy-paste insert statements from `./src/db/seed_prod` folder for the respective models into the ElephantSQL Browser and execute them.

1. Shout in the #backend-status channel that the hosted DB is live again.

## Accessing the hosted DB directly

If you want to query the remote database directly, you can do so on Elephant SQL (credentials in #useful-links channel). Here you would use the common SQL statements, such as SELECT, INSERT, UPDATE, DELETE.

To access hosted data manually, follow these steps:
1. Click on the name of the instance in ElephantSQL:
 <img src="https://i.imgur.com/ZoSVjOL.png" alt="local DB setup" width="700"/>

1. Open BROWSER from the left hand side menu, write your query into the text box and click "Execute" button.
  <img src="https://i.imgur.com/n1bQaqC.png" alt="local DB setup" width="700"/>
