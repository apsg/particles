# Particles

## The idea
The idea was to have animated particle style (star-like) image with gradient 
background and ability to set static points/shapes that would interact with 
moving particles. Also some interaction with mouse cursor would be a plus. 

![demo](https://github.com/apsg/particles/blob/main/demo/demo.png?raw=true) 

## Lets start
The easiest way – in my opinion – to start with a semi-scientific web/JS 
project is to use P5.js. Look, there is already an example that could serve 
as a starting point:

https://p5js.org/examples/simulate-particles.html

Few tweaks (lower speed, more particles, more visible lines) and we have nice 
looking, moving particles. Let’s also add some background and we have nice 
looking starting point:

https://editor.p5js.org/gacek.borowy/sketches/rPUUXzFFB 

Now to add some static points. Coordinates for image points can be created 
quite simply: open image in some sort of image editor (like GIMP), hower over 
each point and note the coordinates. Then note also total size of the image and 
here you go. It is nice to add some sort of scaling factor to give us more 
control over final size of the image. Thanks to that we can easily center the 
image and scale it to any size we want:

```javascript
let xOffset = width/2 - scale*imageSize.x/2;
let yOffset = height/2 - scale*imageSize.y/2;
...
particles.push(new StaticParticle(
    xOffset + scale*points[0], 
    yOffset+scale*points[1])
);
``` 
Let’s also add some neat visual adjustments to it and here we have the result:

https://editor.p5js.org/gacek.borowy/sketches/ncRaNVdon

The final step is to add some interactivity with the mouse. To accomplish it we 
"drag" particles towards the mouse pointer in some area (let's use line 
distance for it, since we have it) by some factor:

```javascript
...
particles[i].drag(mouseX, mouseY);
...

drag(px, py)
  {
    if(dist(this.x, this.y, px, py) < 2*this.lineDistance){
      this.x -= 0.05*(this.x - px);
      this.y -= 0.05*(this.y - py);
    }
  }
``` 

https://editor.p5js.org/gacek.borowy/sketches/dKeah_0jy

This outcome is quite satisfying, we can now start extracting it to more 
structured, confined and configurable code.

## Move to components
Let’s create a new Vue 2 component for our particles.
To handle P5.js inside of vue one can use this package:

https://www.npmjs.com/package/vue-p5

First of all, let’s extract our particle classes to separate file called 
particles.js. These classess heavily depend on p5’s methods and sketch object,
so it has to have access to it. 

```javascript
this.particles.push((new Particle(sketch));
...
export class Particle {
    constructor(sketch) {
        this.sketch = sketch;
...
```

Then if one has to access any p5's bilt-in function, just refer to it through passed `sketch` object:

```javascript
createParticle() {
    this.sketch.noStroke();
    this.sketch.fill('rgba(200,169,169,0.8)');
    this.sketch.circle(this.x, this.y, this.r);

    return this;
}
```

First iteration is finished – all functionality 
from demo code (web editor) is moved to working vue component.

https://github.com/apsg/particles/commit/7d4277f6389b76097d3003cbd634817c1305ce7a

Now it’s time to add a bit of configurability and smart behaviour to it. 
First of all, it should allow to use it as a wrapper, background, for 
anything passed to it into <slot>. Secondly, parameters like gradient color, 
number of particles, line distance etc should be configurable through props. 
Also let’s add some fluent syntax to Particle class.

https://github.com/apsg/particles/commit/f24243f9785ae69d99ae0137da5767b22f44f794

**Note:** To run the demo at this point just serve the project using Vue CLI:

```shell script
vue serve demo/Demo.vue
```
or
```shell script
npm run dev
```

## Package it

Final step is to package and bundle the code for reusability and to publish it 
for npm.  

Unfortunately Vue documentation is not very helpful. It points to main direction 
but leaves with few loose ends to fix on your own.

https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html

The biggest one is to be even able to compile it we have to add `VuePlugin` to 
`rollup.config.js`

```javascript
import VuePlugin from "rollup-plugin-vue";
...
    plugins: [
        VuePlugin(),
        ... 
```

Note that the [order of plugins matter](https://github.com/vuejs/rollup-plugin-vue/issues/231) 
and `VuePlugin` should be first one.

After cleaning up some imports in rollup config we can finally use 
`npm run build` to create 3 versions of bundled code. The final step
is to publish it to NPM.

## Conclusions

There are already great alternatives to this package, for example [this one](https://vue-particles.netlify.app) 
I discovered while trying to publish my own package to npm (names clash!). 
So what's the point in creating another one? Isn't it just another trash-package
out there in code multiverse, which makes it harder to find real useful ones?

Learning! Creating this package took me two evenings. In the process: 
- I refreshed my little rusty knowledge of p5.js,
- learned how to create npm package containing Vue components, 
- learned how to bundle things using rollup, 
- published my first package to npm,
- created this blog-like article/readme showing my whole thought process 
(which can be useful for learning purposes, I presume).

I will work on my package for fun and to use it in another personal project 
(it gives me the ability to add images in form of static points). 