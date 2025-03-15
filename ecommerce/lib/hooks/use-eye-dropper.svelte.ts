export class CustomEyeDropper {
	constructor() {
		if (!('getUserMedia' in navigator.mediaDevices)) {
			throw new Error('Screen capture is not supported on this device.');
		}
	}

	async open(): Promise<{ color: string }> {
		try {
			// Request screen capture
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: {
					cursor: 'always', // Add the cursor property
				} as MediaTrackConstraints, // Type assertion here
			});

			const video = document.createElement('video');
			video.srcObject = stream;

			// Wait for the video to load metadata
			await new Promise((resolve) => (video.onloadedmetadata = resolve));

			// Play the video
			video.play();

			// Create a canvas to draw the video frame
			const canvas = document.createElement('canvas');
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			const ctx = canvas.getContext('2d')!;

			// Draw the current video frame
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

			// Stop the video stream to release resources
			stream.getTracks().forEach((track) => track.stop());

			// Return a promise that resolves with the color picker logic
			return new Promise((resolve) => {
				canvas.addEventListener('click', (e) => {
					// Get the pixel color from the canvas
					const rect = canvas.getBoundingClientRect();
					const x = e.clientX - rect.left;
					const y = e.clientY - rect.top;
					const imageData = ctx.getImageData(x, y, 1, 1).data;

					// Convert to HEX color
					const hex = `#${imageData[0].toString(16).padStart(2, '0')}${imageData[1]
						.toString(16)
						.padStart(2, '0')}${imageData[2].toString(16).padStart(2, '0')}`;

					resolve({ color: hex });

					// Remove the canvas
					canvas.remove();
				});
			});
		} catch (error) {
			throw new Error('Failed to capture screen.');
		}
	}
}

export function useEyeDropper () {
  return new CustomEyeDropper()
}