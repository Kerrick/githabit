# GitHabit

Use [Github webhooks](https://developer.github.com/webhooks/) with [HabitRPG](https://habitrpg.com/)!

## Running the server

```
GITHABIT_PORT=4567 node ./index.js
```

### Environment variables

- `GITHABIT_PORT` (number), which port to listen to. Defaults to `4567`.

## Using the webhook

0. Go to a github repository you control
0. Click "Settings"
0. Click "Webhooks & Services"
0. Click "Add webhook"
0. For the Payload URL use the following URL structure, customizing
    the protocol, domain, and port, for your server, and
    the API Key, and User GUID for your HabitRPG account:
    ```
    http://example.com:4567/githabit?api=abc123&user=xyz789
    ```

