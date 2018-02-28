

var app = new WHS.App([new WHS.ElementModule({
  container: document.getElementById('app')
}), new WHS.SceneModule(), new WHS.CameraModule({
  position: {
    y: 10,
    z: 50
  }
}), new WHS.RenderingModule({
  bgColor: 'black',

  renderer: {
    antialias: true,
    shadowmap: {
      type: THREE.PCFSoftShadowMap
    }
  }
},{ 
  shadow: true
}),
  new WHS.OrbitControlsModule(), 
  new WHS.ResizeModule(),
  
]);

// Tierra
var tierra = new WHS.Sphere({ // Create sphere comonent.
  geometry: [25, 32, 32],
  material: new THREE.MeshPhongMaterial({
    color: 'white',
    map:new THREE.TextureLoader().load('../images/tierra1.jpg'),
  }),
  position: new THREE.Vector3(0, 0, 0)
});

new WHS.Loop(() => {
  tierra.rotation.y += 0.0005;
}).start(app);

tierra.addTo(app);


// Nubes
var material = new THREE.MeshStandardMaterial({ color: "#fff", transparent: true, side: THREE.DoubleSide, alphaTest: 0, emissive: "white",
emissiveIntensity: 0.5});
 
var alphaMap = new THREE.TextureLoader().load('../images/nubes.jpg');
material.alphaMap = alphaMap;
material.alphaMap.magFilter = THREE.NearestFilter;
material.alphaMap.wrapT = THREE.RepeatWrapping;

var nubes = new WHS.Sphere({ // Create sphere comonent.
  geometry: [25.4, 32, 32],
  material,  
  position: new THREE.Vector3(0, 0, 0)
});
new WHS.Loop(() => {
  nubes.rotation.y += 0.001;
  
}).start(app);
nubes.addTo(app);


// Lights
new WHS.PointLight({
  light: {
    intensity: 200,
    distance: 100
  },

  shadow: {
    fov: 90
  },

  position: new THREE.Vector3(0, 10, 10)
}).addTo(app);

new WHS.AmbientLight({
  light: {
    intensity: 1
  }
}).addTo(app);


// Start the app
app.start();