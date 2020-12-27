<template>
    <v-card
        class="mt-4 mx-auto"
        max-width="700"
    >
        <v-sheet
            class="v-sheet--offset mx-auto"
            color="#202530"
            elevation="12"
        >
            <v-sparkline
                :value="values"
                :labels="labels"
                :smooth="16"
                :stroke-linecap="round"
                :fill="fill"
                :gradient="['#f72047', '#ffd200', '#1feaea']"
                line-width="2"
                height="120px"
                padding="5"
                auto-draw
            ></v-sparkline>
        </v-sheet>
    </v-card>
</template>

<script>
export default {
    props: {
        measurements: Array,
    },

    data: () => ({
    fill: true,
  }),

    computed: {
        values() {
            return this.measurements.map(x=>x.temperature);
        },

        labels() {
            return this.measurements.map(function(measurement) {
                var date = new Date(measurement.time);
                return date.getDate();
            });
        },
    }
}
</script>

<style>

</style>