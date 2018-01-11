import React, { Component } from 'react';
import './App.css';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import uv from './UV_Grid_Sm.jpg';
import fractal from './fractal.jpg';
import what from './what.jpg';
import jesus from './jesus.jpg';



class App extends Component {

    constructor(props, context) {
        super(props, context);

        // construct the position vector here, because if we use 'new' within render,
        // React will think that things have changed when they have not.
        this.cameraPosition = new THREE.Vector3(0, 0, 400);
        this.texture = new THREE.TextureLoader('./fractal.jpg');

        this.state = {
            cubeRotation: new THREE.Euler(),
        };

        this._onAnimate = () => {
            // we will get this callback every frame

            // pretend cubeRotation is immutable.
            // this helps with updates and pure rendering.
            // React will be sure that the rotation has now updated.
            this.setState({
                cubeRotation: new THREE.Euler(
                    this.state.cubeRotation.x + 0.005,
                    this.state.cubeRotation.y + 0.01,
                    0
                ),
            });
        };
    }


    render() {
        const width = window.innerWidth; // canvas width
        const height = window.innerHeight; // canvas height

        return (<div ref="container">

            <React3
            mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
            width={width}
            height={height}
            pixelRation={window.devicePixelRatio}

            onAnimate={this._onAnimate}
        >
            <resources>
                <texture resourceId="texture" url="/images/src/fractal.jpg" wrapS={THREE.RepeatWrapping} wrapT={THREE.RepeatWrapping} anisotropy={16} />
                <meshLambertMaterial resourceId="material" side={THREE.DoubleSide} >
                    <textureResource resourceId="texture" />
                </meshLambertMaterial>
            </resources>
            <scene>
                <perspectiveCamera
                    name="camera"
                    fov={75}
                    aspect={width / height}
                    near={1}
                    far={1000}

                    position={this.cameraPosition}
                />
                <mesh
                    rotation={this.state.cubeRotation}
                >
                    <boxGeometry
                        width={200}
                        height={200}
                        depth={200}
                    />
                    <meshBasicMaterial>
                        <texture url="/images/src/fractal.jpg" />
                    </meshBasicMaterial>
                </mesh>
            </scene>
        </React3>
        </div>);
    }
}

export default App;
