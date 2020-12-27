# micro-weather-station

### Starting the app

```terminal
docker-compose up
```

### Building the app (fully)

```terminal
docker-compose build [--no-cache]
```

The full application includes:
- ingest
- backend
- frontend (port 8080)
- influxdb
- mongodb
- redis
- grafana (port 3000)