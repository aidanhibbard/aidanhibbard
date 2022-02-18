---
title: 3D Components with Vue and ThreeJS
desc: Building 3D components with Vue and ThreeJS 
links:
  - threejs-heightmaps
  - https://codepen.io/aidanhibbard/pen/WNXvExR
  - https://github.com/AidanHibbard/mountains
date: 2020-10-10
image: https://cdpn.io/aidanhibbard/fullpage/vYWOZmz
tags:
  - 3D
  - ThreeJS
  - Vue
  - Nuxt
  - Component
  - Javascript
  - Beginner
---
This tutorial references the ThreeJS docs which you can find [here](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
# We're goin 3D baby
### <br />
Have you ever looked at your site and thought that it's flat and boring? You imagine spinning shapes and text doing flips or a game that users can play and love. Whatever crazy thing you imagine it can be built in Vue with ThreeJS and in this article I will cover how to render your first object in the browser with a single Vue component. 

Before getting started I would recommend being familiar with the Javascript 'this' concept and VueJS methods.
### <br />
## What is ThreeJS?
### <br />
ThreeJS is a Javascript library that helps developers build GPU accelerated 3D renders utilizing [WebGL](https://www.khronos.org/webgl/wiki/) rather than depending on baked in browser tools. WebGL or Web Graphics Library is an API for rendering Javascript based interactive 2D and 3D graphics across supported browsers (you can read about which browsers are supported [here](https://en.wikipedia.org/wiki/WebGL).) Utilizing these two libraries you can build some impressive animations or even render prebuilt models that are made in other creation suites like Blender or Unity (more on that [here](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models).) I'd highly recommend checking out some of the [examples](https://threejs.org/examples/) ThreeJS has on their site so you can begin to grasp what you have the ability to create in only a few lines of code.
### <br />
## Getting started
### <br />
First we will need to create a Vue or Nuxt app (you can implement Three into your current projects, skip down to step 2)
### <br />
Install ThreeJS
```javascript
npm i three
```
### <br />
Then create a new component for your animation and import ThreeJS
```javascript
// components/animation.vue
<template>

</template>
<script>
    import * as THREE from 'three';
    export default {
        name: 'Animation',
    }
</script>
<style scoped>

</style>
```
### <br />
## Create the component
### <br />
In our Vue component we will need to define values within the data function as these will be used to make our shapes, camera, scene and introduce the renderer.
```javascript
// components/animation.vue
<script>
    import * as THREE from 'three';
    export default {
        name: 'Animation',
    },
    data() {
        return {
            sphere: null,
            renderer: null,
            scene: null,
            camera: null
        }
  },
</script>
```
### <br />
What we just created are essentially the four elements you will need to create a ThreeJS animation. First we define a sphere geometry which will be the model that we are animating. You can also use cube geometry if you wanted to make a box model and you can find the docs on any shape geometry you'd like to make [here](https://threejs.org/docs/#api/en/geometries/BoxGeometry). Next we define the renderer which is the object we will create a new WebGL render in. You can think of the renderer as the scene, models, and camera combined into an object that we can then append to an element to display on our page. The scene is the box in which our model will sit, scene is essentially everything around your models. Lastly the camera is the position at which you view the scene and this can be defined with camera angles that change the direction of view. 
### <br />
## Building our model 
### <br />
Before we import our component in the app or page we will need to create a parent element within the template, so in the template section of our component go ahead and create a div element with the any id. This will be the element that we bind our animation to later on.
```html
// components/animation.vue
<template>
    <div id="c"></div>
</template>
<style scoped>
/* feel free to size this how youd like */
#c {
  width: 100%;
  height: 300px;
  margin: 0;
}
</style>
```
### <br />
Now that we've set the scene (Get it?) we can now start to build our model. We will introduce two methods into our component and call them using the mounted function.
```javascript
// components/Animation.vue
<script>
    import * as THREE from 'three'
    export default {
        name: 'Animation',
        data() {
            return {
            sphere: null,
            renderer: null,
            scene: null,
            camera: null
            }
        },
        methods: {
            init: function() {

            },
            animate: function() {

            }
        },
        mounted() {
            this.init()
            this.animate()
        }
    }
</script>
```
### <br />
The code above should look fairly simple, we created two functions within out methods an initializer and animater. In the init function we will initialize our scene, camera, model and WebGL renderer. In the animate function we will make a requestAnimationFrame() that calls back to the animate function and rotates our sphere.
### <br />
## Creating the sphere model
### <br />
In the previous section we created two functions within our methods, we can start with the init function initializing our scene, camera and WebGL renderer. 
```javascript
// components/Animation.vue
<script>
    import * as THREE from 'three'
    export default {
        name: 'Animation',
        data() {
            return {
            sphere: null,
            renderer: null,
            scene: null,
            camera: null
            }
        },
        methods: {
            init: function() {
                this.scene = new THREE.Scene()
                this.camera = new THREE.PerspectiveCamera(
                    75, document.getElementById('c').offsetWidth / document.getElementById('c').offsetHeight, 0.1, 1000
                )

                this.renderer = new THREE.WebGLRenderer({ antialias: true })
                this.renderer.setSize(document.getElementById('c').offsetWidth, document.getElementById('c').offsetHeight)
                document.getElementById('c').appendChild(this.renderer.domElement)

                this.camera.position.z = 10;
            },
            animate: function() {

            }
        },
        mounted() {
            this.init()
            this.animate()
        }
    }
</script>
```
### <br />
Let's pause here for a second and take a look at what we just made. It's not a lot of code but we've set the scene, camera and started to render with WebGL. We can now introduce our component to our app / page and see a black box meaning we have succesfully started rendering within the web. 
```javascript
<template>
 <Animation />
</template>
<script>
// Nuxt Syntax
// App.Vue or Nuxt Page
import Animation from '~/components/Animation'
export default {
    components: {
        Animation
    }
}
</script>
```
### <br />
TODO: Use this section to cover code block above
### <br />
Now that we've laid the ground work lets add the sphere model to our component
```javascript
// components/Animation.vue
<script>
    import * as THREE from 'three'
    export default {
        name: 'Animation',
        data() {
            return {
            sphere: null,
            renderer: null,
            scene: null,
            camera: null
            }
        },
        methods: {
            init: function() {
                this.scene = new THREE.Scene()
                this.camera = new THREE.PerspectiveCamera(
                    75, document.getElementById('c').offsetWidth / document.getElementById('c').offsetHeight, 0.1, 1000
                )
                //Renderer
                this.renderer = new THREE.WebGLRenderer({ antialias: true })
                this.renderer.setSize(document.getElementById('c').offsetWidth, document.getElementById('c').offsetHeight)
                document.getElementById('c').appendChild(this.renderer.domElement)

                //Sphere
                const geometry = new THREE.SphereGeometry(5, 25, 25, 5, Math.PI * 2, 0, Math.PI * 2);
                const material = new THREE.MeshNormalMaterial({ wireframe: true });
                this.sphere = new THREE.Mesh(geometry, material);
                this.scene.add(this.sphere);

                this.camera.position.z = 10;
            },
            animate: function() {

            }
        },
        mounted() {
            this.init()
            this.animate()
        }
    }
</script>
```
### <br />
Nice! Now we've got a rainbow sphere! Let's use our animate function to start requesting some frames and make the model spin!
```javascript
// components/Animation.vue
<script>
    import * as THREE from 'three'
    export default {
        name: 'Animation',
        data() {
            return {
            sphere: null,
            renderer: null,
            scene: null,
            camera: null
            }
        },
        methods: {
            init: function() {
                this.scene = new THREE.Scene()
                this.camera = new THREE.PerspectiveCamera(
                    75, document.getElementById('c').offsetWidth / document.getElementById('c').offsetHeight, 0.1, 1000
                )
                //Renderer
                this.renderer = new THREE.WebGLRenderer({ antialias: true })
                this.renderer.setSize(document.getElementById('c').offsetWidth, document.getElementById('c').offsetHeight)
                document.getElementById('c').appendChild(this.renderer.domElement)

                //Sphere
                const geometry = new THREE.SphereGeometry(5, 25, 25, 5, Math.PI * 2, 0, Math.PI * 2);
                const material = new THREE.MeshNormalMaterial({ wireframe: true });
                this.sphere = new THREE.Mesh(geometry, material);
                this.scene.add(this.sphere);

                this.camera.position.z = 10;
            },
            animate: function() {
                requestAnimationFrame(this.animate)

                this.sphere.rotation.y += 0.001;
                this.sphere.rotation.x += 0.001;
                this.renderer.render(this.scene, this.camera)
            }
        },
        mounted() {
            this.init()
            this.animate()
        }
    }
</script>
```
### <br />
TODO: Go over this code block
### <br />
Whoop Whoop we've now got a wireframe discoball spinning on our page
