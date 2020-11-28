<template>
    <particles
        :width="900"
        :height="600"
        :image="imageData"
        :static-distance="40"
    >
        <p style="color: white; font-size: 30px;">Test</p>
    </particles>
</template>

<script>
import Particles from "../src/Particles";
import {image} from "./demo_image";

export default {
    name: "Demo.vue",
    components: {Particles},

    computed: {
        imageData() {
            return image;
        }
    }
}
</script>

<style scoped>

</style>