import React, { useEffect, useRef } from "react";
import "./styles.css";

export default function LoadingPage() {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
  
      // Set canvas size to fill the window
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      // Dots settings
      const dots = [];
      const dotCount = 100;
      const maxDistance = 100; // Maximum distance between dots to connect with a line
  
      // Dot class
      class Dot {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.size = 3;
          this.speedX = Math.random() * 0.5 - 0.25; // Random speed for movement
          this.speedY = Math.random() * 0.5 - 0.25; // Random speed for movement
        }
  
        // Draw the dot
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = 'white';
          ctx.fill();
        }
  
        // Update the position of the dot
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
  
          // Bounce off the edges
          if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
          if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
        }
      }
  
      // Create dots
      for (let i = 0; i < dotCount; i++) {
        dots.push(new Dot(Math.random() * canvas.width, Math.random() * canvas.height));
      }
  
      // Function to draw lines between close dots
      function connectDots() {
        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const dx = dots[i].x - dots[j].x;
            const dy = dots[i].y - dots[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
  
            // If the distance between dots is smaller than the maxDistance, draw a line
            if (distance < maxDistance) {
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(dots[i].x, dots[i].y);
              ctx.lineTo(dots[j].x, dots[j].y);
              ctx.stroke();
            }
          }
        }
      }
  
      // Animate the dots and connecting lines
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  
        // Draw and update each dot
        for (let i = 0; i < dots.length; i++) {
          dots[i].update();
          dots[i].draw();
        }
  
        connectDots(); // Connect close dots with lines
  
        requestAnimationFrame(animate); // Keep the animation going
      }
  
      animate();
  
      // Resize the canvas when the window size changes
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resizeCanvas);
  
      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }, []);
  return (
    <div className="container">
        <div className="text-container">
        <span className="text">N</span>
        <span className="text">E</span>
        <span className="text">X</span>
        <span className="text">U</span>
        <span className="text">M</span>
        </div>
        <canvas ref={canvasRef}>
        
        </canvas>
        
        
    </div>
  );
}
