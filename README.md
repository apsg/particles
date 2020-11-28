# Particles

## The idea
The idea was to have animated particle style (star-like) image with gradient 
background and ability to set static points/shapes that would interact with 
moving particles. Also some interaction with mouse cursor would be a plus. 

![demo](img=https://github.com/apsg/particles/blob/main/demo/demo.png?raw=true) 

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
here you go. Also it’s nice to add some sort of scaling factor to give us more 
control over final size of the image.
Let’s also add some neat visual adjustments to it. 

https://editor.p5js.org/gacek.borowy/sketches/ncRaNVdon

The final step is to add some interactivity with the mouse:

https://editor.p5js.org/gacek.borowy/sketches/dKeah_0jy

This outcome is quite satisfying, we can now start extracting it to more 
structured, confined and configurable code.

## Move to components
Let’s create a new Vue 2 component following this tutorial:

https://www.telerik.com/blogs/vuejs-how-to-build-your-first-package-publish-it-on-npm

To handle P5.js inside of vue one can use this package:

https://www.npmjs.com/package/vue-p5

First of all, let’s extract our particle classes to separate file called 
particles.js. These classess heavily depend on p5’s methods and sketch object,
so it has to have access to it. First iteration is finished – all functionality 
from demo code (web editor) is moved to working vue component.

https://github.com/apsg/particles/commit/7d4277f6389b76097d3003cbd634817c1305ce7a

Now it’s time to add a little bit of configurability and smart behaviour to it. 
First of all, it should allow to use it as an wrapper, background, for 
anything passed to it into <slot>. Secondly, parameters like gradient color, 
number of particles, line distance etc should be configurable through props. 
Also let’s add some fluent syntax to Particle class.

https://github.com/apsg/particles/commit/f24243f9785ae69d99ae0137da5767b22f44f794
