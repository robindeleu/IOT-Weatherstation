<template>
    <v-row
        justify="center"
        align="center"
        >
        
        <v-col
            md="6"
            v-if="! measurements"
            class="mt-5"
        >
            <v-row>
                <h1
                    class="mx-auto white--text"
                    style="font-size: 3em;"
                    >
                    no data.
                </h1>
            </v-row>
        </v-col>


        <v-col
            v-else
            md="6"
        >
            <v-row
                class="my-5"
                >
                <h1
                    class="mx-auto white--text"
                    style="font-size: 3em;"
                    >
                    {{ measurements[measurements.length - 1].temperature }} °C
                </h1>
            </v-row>
            

            <v-row class="mb-3">
                <v-icon color="white" x-large>mdi-water-outline</v-icon>
                <h1 class="font-weight-bold white--text">
                    {{ measurements[measurements.length - 1].humidity }} %
                </h1>
            </v-row>

            <v-row  class="mb-3">
                <v-icon color="white" x-large>mdi-weather-windy</v-icon>
                <h1 class="font-weight-bold white--text">
                    {{ measurements[measurements.length - 1].pressure }} hPa
                </h1>
            </v-row>

            <v-row class="mb-3">
                <v-icon color="white" x-large>mdi-signal-variant</v-icon>
                <h1 class="font-weight-bold white--text">
                    {{ measurements[measurements.length - 1].rssi }} dBm
                </h1>
            </v-row>
      <vue-moments-ago
      class="mx-auto white--text"
        style="font-size: 1em;"
      prefix="posted"
      suffix="ago"
      date= measurements[0].time
      >
    </vue-moments-ago>
        </v-col>
    </v-row>
</template>

<script>
import VueMomentsAgo from "vue-moments-ago";
export default {
    props: {
        measurements: Array,
    },
    components: {
    VueMomentsAgo
  },
}
</script>

<style>

</style>