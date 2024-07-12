import { Frame, Blob } from './zim.js';

new Frame("fit", 1024, 768, "#FFFFFF", "#000000", ready).addTo();

function ready() {
    // Create a blob that resembles a triangle
    let triangleBlob = new Blob({
        points: 3,      // Number of points (vertices) of the blob
        radius: 100,    // Radius from the center to the points
        sides: 100,      // Number of sides (smoothness)
        color: "pink",  // Color of the blob
        borderColor: "purple", // Border color
        borderWidth: 2  // Border width
    });

    // Center the blob on the stage
    triangleBlob.center();
}
