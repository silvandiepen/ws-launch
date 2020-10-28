# WS Launch

A Web Socket Mock data launcher

### Installation

To start the project,

```
npm install
```

### Run

```
npm start
```

or with npx;

```
npx ws-launch
```

### Settings

| Settings | Default | Argument |
| -------- | ------- | -------- |
| Port     | `4000`  | `--port` |
| Data     | `{}`    | `--data` |
| File     | ''      | `--file` |
| Wait     | `5000`  | `--wait` |

If you want any other data, you can pass arguments like;

```
npm start -- --port=5000 --data=./test.json
```

### Inline data

You can use inline json data.

```
npx ws-launch --data="{}"
```

Your json needs to be stringified and escaped.

<iframe src="docs/convert.html" style="width: 100%; height: 50vh; min-height: 320px; border: none;"></iframe>
