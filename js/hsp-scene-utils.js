function initializeScene(holoStreamInstance){
          let threeObjects = {
              threeScene: holoStreamInstance.getThreeScene(),
              threeCanvas: holoStreamInstance.getHoloStreamCanvas(),
              threeRenderer: holoStreamInstance.getThreeRenderer(),
              threeCamera: holoStreamInstance.getThreeCamera()
          };

          let fillColor = new THREE.Color("#aaa");
          threeObjects.threeScene.background = fillColor;
          threeObjects.threeScene.fog = new THREE.FogExp2(fillColor, 0.05);

          // Create the light to cast the shadows
          var light = new THREE.PointLight( 0xffffff, 1, 100 );
          light.position.set( -10, 10, 10 );
          light.castShadow = true;
          light.shadow.mapSize.width = 2048;
          light.shadow.mapSize.height = 2048;

          threeObjects.threeScene.add( light );

          // Create the surface to receive the shadows
          var fillGeometry = new THREE.PlaneGeometry(100, 100, 32);
          fillGeometry.translate(0, 0, 0);
          fillGeometry.rotateX(-90 / 57.2958);

          var fillMaterial = new THREE.MeshPhongMaterial( {
              color: new THREE.Color("#444")
          });

          var fillPlane = new THREE.Mesh( fillGeometry, fillMaterial );
          fillPlane.receiveShadow = true;
          threeObjects.threeScene.add( fillPlane );

          // Add camera controls
          let controls = new THREE.OrbitControls( threeObjects.threeCamera, threeObjects.threeRenderer.domElement );
          controls.enableDamping = true;
          controls.dampingFactor = 0.09;
          controls.enableKeys = true;
          controls.autoRotate = false;
          controls.autoRotateSpeed = 2.0;
          controls.target = new THREE.Vector3(0, 1, 0);
          controls.maxPolarAngle = Math.PI * .6;
          controls.minPolarAngle = Math.PI * .25;
          controls.update();
}
