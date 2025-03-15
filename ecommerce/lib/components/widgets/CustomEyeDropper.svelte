<script lang="ts">
  import { onMount } from "svelte";

  let selectedColor: string = "#ffffff";
  let isPipetteActive: boolean = false;
  let magnifierPosition: { x: number; y: number } = { x: 0, y: 0 };
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let magnifierCanvas: HTMLCanvasElement;
  let magnifierCtx: CanvasRenderingContext2D;

  onMount(() => {
    // Initialize canvases
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d")!;
    magnifierCanvas = document.createElement("canvas");
    magnifierCtx = magnifierCanvas.getContext("2d")!;
  });

  // Function to capture the screen and display the magnifier
  const activatePipette = async () => {
    isPipetteActive = true;

    // Capture the screenx
    const stream = await navigator.mediaDevices.getDisplayMedia({
      // @ts-ignore
      video: { cursor: "always" },
      audio: false,
    });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();

      // Draw the screen onto the canvas
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Start tracking the cursor
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("click", handleColorSelection);
      document.addEventListener("touchend", handleColorSelection);
    };
  };

  // Handle mouse movement for desktop
  const handleMouseMove = (event: MouseEvent) => {
    magnifierPosition.x = event.clientX;
    magnifierPosition.y = event.clientY;
    updateMagnifier();
  };

  // Handle touch movement for mobile
  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    const touch = event.touches[0];
    magnifierPosition.x = touch.clientX;
    magnifierPosition.y = touch.clientY;
    updateMagnifier();
  };

  // Update the magnifier view
  const updateMagnifier = () => {
    const magnifierSize = 100; // Size of the magnifier
    const zoomLevel = 5; // Zoom level

    magnifierCanvas.width = magnifierSize;
    magnifierCanvas.height = magnifierSize;

    // Draw the magnified portion of the screen
    magnifierCtx.drawImage(
      canvas,
      magnifierPosition.x - magnifierSize / (2 * zoomLevel),
      magnifierPosition.y - magnifierSize / (2 * zoomLevel),
      magnifierSize / zoomLevel,
      magnifierSize / zoomLevel,
      0,
      0,
      magnifierSize,
      magnifierSize
    );
  };

  // Handle color selection
  const handleColorSelection = (event: MouseEvent | TouchEvent) => {
    if (!isPipetteActive) return;

    const x = magnifierPosition.x;
    const y = magnifierPosition.y;

    // Get the color from the canvas
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    selectedColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

    // Deactivate the pipette
    isPipetteActive = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("click", handleColorSelection);
    document.removeEventListener("touchend", handleColorSelection);
  };
</script>

<style>
  .color-display {
    width: 200px;
    height: 200px;
    border: 2px solid #000;
    margin-top: 20px;
  }

  .magnifier {
    position: absolute;
    border: 2px solid #000;
    border-radius: 50%;
    overflow: hidden;
    pointer-events: none;
    display: none;
  }

  .pipette-active .magnifier {
    display: block;
  }
</style>

<!-- Pipette Button -->
<button on:click={activatePipette} disabled={isPipetteActive}>
  {isPipetteActive ? "Select a color..." : "Activate Pipette"}
</button>

<!-- Color Display -->
<div class="color-display" style="background-color: {selectedColor};"></div>

<!-- Magnifier -->
<div
  class="magnifier"
  style="left: {magnifierPosition.x + 10}px; top: {magnifierPosition.y + 10}px;"
>
  <canvas bind:this={magnifierCanvas} />
</div>