import { parallaxItems } from "../constants/index";
import React from "react";
import ParallaxImage from "./ParallaxImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ParallaxScene = () => {
  useGSAP(() => {
    const parallaxItems = document.querySelectorAll(".parallax");
    const main = document.querySelector("main");

    let xValue = 0,
      yValue = 0;

    let rotateDegree = 0;

    function update(cursorPosition) {
      parallaxItems.forEach((item) => {
        let speedX = item.dataset.speedx;
        let speedY = item.dataset.speedy;
        let speedZ = item.dataset.speedz;
        let rotationSpeed = item.dataset.rotation;

        let isInLeft =
          parseFloat(getComputedStyle(item).left) < window.innerWidth / 2
            ? 1
            : -1;

        let zValue =
          (cursorPosition - parseFloat(getComputedStyle(item).left)) *
          isInLeft *
          0.1;

        item.style.transform = ` perspective(2300px) translateZ(${
          zValue * speedZ
        }px) rotateY(${
          rotateDegree * rotationSpeed
        }deg) translateX(calc(-50% + ${
          -xValue * speedX
        }px)) translateY(calc(-50% + ${yValue * speedY}px))`;
      });
    }
    update(0);

    window.addEventListener("mousemove", (e) => {
      if (timeline.isActive()) return;

      xValue = e.clientX - window.innerWidth / 2;
      yValue = e.clientY - window.innerHeight / 2;
      rotateDegree = (xValue / (window.innerWidth / 2)) * 50;
      update(e.clientX);
    });

    let timeline = gsap.timeline();

    Array.from(parallaxItems)
      .filter((item) => !item.classList.contains("text"))
      .forEach((item) => {
        timeline.from(
          item,
          {
            top: `${item.offsetHeight / 2 + item.dataset.distance}px`,
            duration: 3.5,
            ease: "power3.out",
          },
          "1"
        );
      });
    timeline
      .from(
        ".text h1",
        {
          y:
            window.innerHeight -
            document.querySelector(".text h1").getBoundingClientRect().top +
            200,
          duration: 2,
        },
        "2.5"
      )
      .from(
        ".text h2",
        {
          y: -150,
          opacity: 0,
          duration: 1.5,
        },
        "3"
      )
      .from(
        ".hide",
        {
          opacity: 0,
          duration: 1.5,
        },
        "3"
      );
  });
  return (
    <main id="main">
      <div className="data">
        <div className="vignette hide"></div>

        {parallaxItems.map((item, index) => (
          <div key={index}>
            <ParallaxImage {...item} />

            <div
              className="text parallax"
              data-speedx="0.07"
              data-speedy="0.07"
              data-speedz="0"
              data-rotation="0.11"
              data-distance="0"
            >
              <h2>China</h2>
              <h1>Zhangjiakou</h1>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ParallaxScene;
