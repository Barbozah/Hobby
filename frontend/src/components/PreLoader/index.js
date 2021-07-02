import React from 'react';
import { Image } from 'react-bootstrap';
import logo from '../../assets/pureshield.svg';

import { gsap } from 'gsap/all';

import './preloader.css';

export default function PreLoader(props) {

  gsap.set("#shield-loader", {transformOrigin: "100% 50%"});

  const tl = gsap.timeline({repeat: -1});

  tl.set("#shield-loader", {x:0, y:0, scale: 1, opacity: 100})
  .fromTo("#shield-loader", {scale: 1}, {duration: 4, scale: 1.5, ease: "sine.inOut", x: 40})
  .set("#shield-loader", {x: 40})
  .fromTo("#shield-loader", {scale: 1.5, x:40}, {duration: 4, scale: 1, ease: "sine.inOut", x: 0})

  return (
    <div className="wrapper-loader">
      <Image 
        id="shield-loader"
        width={200}
        src={logo}
      />
      {!!props.loaded && (() => {
        tl.eventCallback("onRepeat", () => {
          tl.pause().kill();
          gsap.to("#shield-loader", {duration: 1, opacity: 0, ease: 'power2'});
        });
      })()}
    </div>
  );
}