import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { InfluxDB } from 'influx';

interface Data {}

interface ServiceOptions {}

export class Measurements implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find (params?: Params): Promise<Data[] | Paginated<Data>> {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get (id: Id, params?: Params): Promise<Data> {
    const sensor = await this.app.services.sensors.get(id);
    let filter = null;
    const period = params!.query!.period;
    const allowed_periods = [
      "2h",
      "24h",
      "7d",
      "31d",
      "365d"
    ]
    
    if(allowed_periods.includes(period)) {
      filter = `AND time > now() - ${period}`;
    } else {
      filter = 'order by time desc limit 1'
      // filter = 'DESC LIMIT 1';
    }

    const influx = new InfluxDB({host: this.app.get('influxdb'), database: 'microweatherstation'});
    const query = `SELECT * FROM tph WHERE dev_id = '${sensor.devId}' ${filter}`;
    const result = await influx.query(`SELECT * FROM tph WHERE dev_id = '${sensor.devId}' ${filter}`);
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create (data: Data, params?: Params): Promise<Data> {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update (id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch (id: NullableId, data: Data, params?: Params): Promise<Data> {
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove (id: NullableId, params?: Params): Promise<Data> {
    return { id };
  }
}
