<template>

  <div class="mt-4">
    <v-sheet color="transparent" dark>
      <v-tabs
        fixed-tabs
        background-color="transparent"
      >
        <v-tab
          v-for="sensor in sensors"
          :key="sensor._id"
        >
          {{ sensor.name }}
        </v-tab>
        
        <v-tab-item
          v-for="sensor in sensors"
          :key="sensor._id"
          reverse-transition="fade-transition"
        >
          <v-container>
            <Summary
              :measurements="sensor.measurements"
            />

            <v-btn
              v-if="sensor.measurements && sensor.measurements[0]"
              @click="$router.push(`/station/${sensor._id}`)"
              >
                Go to station
            </v-btn>
            
          </v-container>
        </v-tab-item>
      </v-tabs>

    </v-sheet>
  </div>
</template>

<script>
import Summary from '../components/Summary'
import Sensors from '../api/sensors';
import Measurements from '../api/measurements';

export default {
  name: 'App',

  components: { Summary },

  data: () => ({
    sensors: [ ]
  }),
  
  created() {
    this.getSensors();
  },

  methods:{
    getSensors() {
      let _this = this;

      Sensors.index()
        .then(response => {
          this.sensors = response.data.data;

          this.addMeasurements();
        }).catch(function (error) {
            if(error.response.status == 401) {
              _this.$router.push('/login');
            }
        });
        console.log("sensor data in home:", this.sensors)
    },

    addMeasurements() {
      Object.keys(this.sensors).forEach(key => {
        Measurements.get(this.sensors[key]._id)
            .then(response => {
                this.$set(this.sensors[key], 'measurements', response.data);
                console.log(this.sensors[key]);
            });
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
