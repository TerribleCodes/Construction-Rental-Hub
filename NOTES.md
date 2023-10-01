# Notes

- [Project Setup](https://www.youtube.com/watch?v=w3vs4a03y3I)
- Don't add `.env` to `.gitignore` as it doesn't contain any sensitive data yet.

- After cloning the repository run the following commands

```shell
    # From the root folder
    cd client
    npm init

    cd ../server
    npm init # As I remember 😅
```

## To run the both client and server at the same time, PowerShell or Git Bash can be used. Before running the script, install the dependencies first

```shell
    # PowerShell
    .\run.ps1 # From the root directory
```

```shell
    # Git Bash
    chmod +x run.sh # From the root directory
    ./run.sh
```

---

## To run the client and server separately

- To run the server

```shell
    cd server
    npm run dev
```

- To run the client

```shell
    cd client
    npm start
```

- `admin123`
