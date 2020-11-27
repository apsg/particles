<template>
    <div class="particles">
        <slot></slot>
        <vue-p5 v-on="{setup, draw}"></vue-p5>
    </div>
</template>
<script>
import VueP5 from 'vue-p5';
import {Particle, StaticParticle} from "./particles";
import {image} from "./demo_image";

export default {
    props: [],

    components: {
        VueP5,
    },

    data() {
        return {
            particles: []
        };
    },

    methods: {
        setup(sketch) {
            sketch.createCanvas(800, 400);
            for (let i = 0; i < 150; i++) {
                this.particles.push(new Particle(sketch));
            }

            // calculate image offset to center it on drawing area
            let xOffset = sketch.width / 2 - image.scale * image.size.x / 2;
            let yOffset = sketch.height / 2 - image.scale * image.size.y / 2;

            // Add static points to create and image
            for (let points of image.coords) {
                this.particles.push(new StaticParticle(sketch,
                    xOffset + image.scale * points[0],
                    yOffset + image.scale * points[1])
                );
            }
        },

        draw(sketch) {
            sketch.clear()
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].createParticle();
                this.particles[i].moveParticle();
                this.particles[i].drag(sketch.mouseX, sketch.mouseY);
                this.particles[i].joinParticles(this.particles.slice(i));
            }
        }
    }
}
</script>
<style>
.particles {
    width: 800px;
    height: 600px;
    background-image: linear-gradient(to right, #3e3b84, #5b1c84);
}
</style>