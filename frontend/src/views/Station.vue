<template>

  <div class="mt-4">
    <v-sheet color="transparent" dark>
      <h1>{{ sensor.name }}</h1>
      <p>{{ sensor.description }}</p>


      <Summary
        :measurements="measurements"
      />
      
      <Chart
        :measurements="measurements"
      />
    </v-sheet>
  </div>
</template>

<script>
import Summary from '../components/Summary'
import Chart from '../components/Chart'
import Sensors from '../api/sensors';
import Measurements from '../api/measurements';

export default {
  name: 'Station',

  components: { Summary, Chart },

  data: () => ({
    sensor: {},
    measurements: []
  }),
  
  created() {
    this.getSensor();
  },

  methods: {
    getSensor() {
      let _this = this;

      Sensors.get(this.$route.params.id)
        .then(response => {
          this.sensor = response.data;
          this.getMeasurements();
        }).catch(function (error) {
            if(error.response.status == 401) {
              _this.$router.push('/login');
            }
        });
    },

    getMeasurements() {
      Measurements.getPeriod(this.sensor._id, '7d')
        .then(response => {
          this.measurements = response.data;
          console.log(this.measurements);
      });
    }

  }
};
</script>


<style>
  /* Make tab-items transparent */
  .v-tabs-items {
    background-color: transparent !important;
  }
</style>
