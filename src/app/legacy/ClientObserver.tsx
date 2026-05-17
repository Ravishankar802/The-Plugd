"use client";
import { useEffect } from "react";

export default function ClientObserver() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // observer.unobserve(entry.target); // Optional: if we want it to animate only once
        }
      });
    }, { threshold: 0.1 });
    
    // Give DOM a tick to render classes
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);
    
    return () => {
      observer.disconnect();
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);
  
  return null;
}
