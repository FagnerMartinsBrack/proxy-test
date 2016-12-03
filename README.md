## Free Proxy Test And Filtering

What does it do?

* Reads a list of proxies in the `proxies.txt` file.
* Make a request to a given URL using each proxy.
* Test the response to see if the body matches the provided `regex` in any part of the body.
* Filter the ones who are invalid, removing them from the `proxies.txt` file.

## Configuring

Before starting you need to configure it by creating a `configuration.json` file on the root of the project.

**Example**

```json
{
  "blocked-url": "http://example.com",
  "regex-for-valid-response": "title=\"Visible website title\""
}
```

## Requirements

* Latest node version or NVM

## Run the application

```shell
$ npm start
```

## Run the tests

```shell
$ npm test
```