import React, { useRef } from "react";
import { useThemeColors } from './ThemeContext';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Heros() {
  const colors = useThemeColors();
  const containerRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const img4Ref = useRef(null);

  useGSAP(() => {
    // Animation du titre avec SplitText
    const titleElement = containerRef.current.querySelector(".title");
    const subtitleElement = containerRef.current.querySelector(".subtitle");

    if (titleElement && subtitleElement) {
      const heroSplit = new SplitText(titleElement, { type: "chars, words" });
      const paragraphSplit = new SplitText(subtitleElement, { type: "lines" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(heroSplit.chars, {
        yPercent: 100,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.04
      }).from(
        paragraphSplit.lines,
        { y: 30, opacity: 0, duration: 1, stagger: 0.1 },
        "-=0.8"
      );
    }

    // Animation d'entrée des images
    const images = [img1Ref.current, img2Ref.current, img3Ref.current, img4Ref.current];
    gsap.set(images, { opacity: 0, scale: 0.7, y: 80 });
    gsap.to(images, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.3,
      ease: "back.out(1.3)",
      stagger: { amount: 0.5, from: "start" },
      delay: 0.6
    });

    // Animation section "À propos de nous"
    const aboutSection = containerRef.current.querySelector(".about-section");
    const aboutTexts = containerRef.current.querySelectorAll(".about-text");
    const aboutBlocks = containerRef.current.querySelectorAll(".about-block");

    gsap.set(aboutTexts, { opacity: 0, y: 40 });
    gsap.set(aboutBlocks, { opacity: 0, y: 60, scale: 0.9 });

    gsap.to(aboutTexts, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: aboutSection,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true
      }
    });

    gsap.to(aboutBlocks, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: "back.out(1.6)",
      stagger: { amount: 0.8, from: "center" },
      scrollTrigger: {
        trigger: aboutSection,
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

    // Effet hover sur chaque image
    images.forEach((img, index) => {
      if (!img) return;
      const originalZ = [1, 10, 20, 30][index];
      img.addEventListener("mouseenter", () => {
        gsap.to(img, {
          scale: 1.12,
          rotate: 0,
          zIndex: 100,
          boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.8)",
          duration: 0.5,
          ease: "power2.out"
        });
      });
      img.addEventListener("mouseleave", () => {
        const rotations = [-12, 8, -6, 10];
        gsap.to(img, {
          scale: 1,
          rotate: rotations[index],
          zIndex: originalZ,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });

    // Parallax scroll
    images.forEach((img) => {
      if (!img) return;
      gsap.to(img, {
        y: "+=80",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1.5
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="acceuil"
      className="relative py-20 px-4 md:px-8 overflow-hidden"
      style={{ background: colors.bgPrimary }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="title text-4xl md:text-6xl lg:text-7xl mb-6 tracking-wide leading-tight"
            style={{ fontFamily: "Playfair Display, serif", color: colors.textPrimary }}
          >
            SERVICE CORDIALE
          </h1>
          <p
            className="subtitle font-[Poppins] text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed"
            style={{ color: colors.accent }}
          >
            Offrez plus qu'un cadeau, Offrez une émotion. <br className="hidden md:block" />
            Service Cordial, l'art de faire plaisir.
          </p>
        </div>

        {/* Images Hero */}
        <div
  className="relative w-full max-w-6xl mx-auto flex items-start"
  style={{ 
    height: "clamp(350px, 50vw, 650px)",  
    marginTop: "-40px"                     
  }}
>

  {/* IMAGE 1 */}
  <img
    ref={img1Ref}
    src="/img1.png"
    alt="Cadeau Service Cordiale"
    className="
      relative
      w-[42%] md:w-[32%]     
      h-auto
      object-cover 
      rounded-3xl
      cursor-pointer
      z-[40]
    "
    style={{ transform: "rotate(-12deg)" }}
  />

  {/* IMAGE 2 */}
  <img
    ref={img2Ref}
    src="/img2.png"
    alt="Célébration Service Cordiale"
    className="
      relative 
      w-[42%] md:w-[32%]
      h-auto 
      object-cover 
      rounded-3xl 
      cursor-pointer
      -ml-[12%]             
      -mt-[3%]               
      z-[30]
    "
    style={{ transform: "rotate(8deg)" }}
  />

  {/* IMAGE 3 */}
  <img
    ref={img3Ref}
    src="/img3.png"
    alt="Moments précieux Service Cordiale"
    className="
      relative 
      w-[42%] md:w-[32%]
      h-auto 
      object-cover 
      rounded-3xl 
      cursor-pointer
      -ml-[12%]
      -mt-[4%]
      z-[20]
    "
    style={{ transform: "rotate(-6deg)" }}
  />

  {/* IMAGE 4 */}
  <img
    ref={img4Ref}
    src="/img4.png"
    alt="Joie Service Cordiale"
    className="
      relative 
      w-[42%] md:w-[32%]
      h-auto 
      object-cover 
      rounded-3xl 
      cursor-pointer
      -ml-[12%]
      -mt-[5%]
      z-[10]
    "
    style={{ transform: "rotate(10deg)" }}
  />

</div>

        {/* Yellow Accent Bar */}
        <div className="w-full flex justify-end -mt-20 md:-mt-30" >
          <div
            className="h-12 md:h-14 rounded-l-full"
            style={{ width: "clamp(300px, 55%, 700px)", backgroundColor: "#FFC107" }}
          />
        </div>

        {/* Description & Images découpées */}
        <div className="max-w-7xl mx-auto mt-20 grid md:grid-cols-2 gap-12 items-center about-section">
          {/* Texte */}
          <div className="text-left space-y-6">
            <p className="text-gray-300 text-[15px] leading-relaxed about-text font-[Poppins] font-bold" style={{ color: colors.textSecondary }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui harum sunt, dolorem rerum explicabo deleniti
              asperiores molestias natus eaque temporibus voluptatibus repellat facilis iure eveniet ratione sint alias
              numquam! Laborum? Labore possimus, magnam voluptatibus, illo nam repellendus inventore omnis voluptatum quod
              amet, fuga accusamus itaque neque vitae obcaecati assumenda dicta! Aspernatur qui repellat non, nesciunt
              voluptatum ducimus cupiditate aperiam veniam.
            </p>
            <div className="flex items-start space-x-4">
              <div
                className="h-20 w-10 rounded"
                style={{
                  background:
                    "radial-gradient(58.98% 58.98% at 55.9% 41.02%, #1E293B 0%, #0B1220 60.45%, #0F172A 100%)"
                }}
              />
              <div className="h-20 w-2 bg-yellow-400 rounded" />
              <p className="text-gray-300 text-[15px] leading-relaxed about-text font-[Poppins] font-bold" style={{ color: colors.textSecondary }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto sit obcaecati hic dignissimos, eaque
                nemo ex tenetur alias placeat aliquid unde nostrum. Hic, nesciunt in beatae delectus nemo illum nisi?
              </p>
            </div>
            <a
              href="https://wa.me/237690271950"
              target="_blank"
               rel="noopener noreferrer"
          className="inline-block px-8 py-3 border border-yellow-400 text-yellow-400 rounded-full 
                     font-[Poppins] text-lg hover:bg-[#0D1526] hover:text-[#0D1526] transition-all duration-300"
              style={{ borderColor: colors.accent, color: colors.accent }}
            >
              Nous contacter
            </a>
          </div>

          {/* Grid Images découpées */}
          <div className="flex items-center justify-center gap-4 w-full py-4" style={{ height: "450px" }}>
            {/* Colonne 1 */}
            <div className="flex flex-col justify-center gap-3">
              <div className="rounded overflow-hidden" style={{ width: "40px", height: "140px" }}>
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: "url('/apropos.jpeg')", backgroundSize: "600% 320%", backgroundPosition: "0% 50%" }}
                />
              </div>
            </div>

            {/* Colonne 2 */}
            <div className="flex flex-col justify-center gap-3">
              <div className="rounded overflow-hidden" style={{ width: "50px", height: "140px" }}>
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: "url('/apropos.jpeg')", backgroundSize: "600% 320%", backgroundPosition: "20% 25%" }}
                />
              </div>
              <div className="rounded overflow-hidden" style={{ width: "50px", height: "140px" }}>
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: "url('/apropos.jpeg')", backgroundSize: "600% 320%", backgroundPosition: "20% 75%" }}
                />
              </div>
            </div>

            {/* Colonne 3 */}
            <div className="flex flex-col justify-center gap-3">
              <div className="rounded overflow-hidden" style={{ width: "60px", height: "120px" }}>
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: "url('/apropos.jpeg')", backgroundSize: "600% 380%", backgroundPosition: "40% 16.6%" }}
                />
              </div>
              <div className="rounded overflow-hidden" style={{ width: "60px", height: "120px" }}>
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: "url('/apropos.jpeg')", backgroundSize: "600% 380%", backgroundPosition: "40% 50%" }}
                />
              </div>
              <div className="rounded overflow-hidden" style={{ width: "60px", height: "120px" }}>
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: "url('/apropos.jpeg')", backgroundSize: "600% 380%", backgroundPosition: "40% 83.3%" }}
                />
              </div>
            </div>

            {/* Colonne 4 */}
            <div className="flex flex-col justify-center gap-3">
              <div className="rounded overflow-hidden" style={{ width: "60px", height: "120px" }}>
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: "url('/apropos.jpeg')", backgroundSize: "600% 380%", backgroundPosition: "60% 16.6%" }}
                />
              </div>
              <div className="rounded overflow-hidden" style={{ width: "60px", height: "120px" }}>
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: "url('/apropos.jpeg')", backgroundSize: "600% 380%", backgroundPosition: "60% 50%" }}
                />
              </div>
              <div className="rounded overflow-hidden" style={{ width: "60px", height: "120px" }}>
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: "url('/apropos.jpeg')", backgroundSize: "600% 380%", backgroundPosition: "60% 83.3%" }}
                />
              </div>
            </div>

            {/* Colonne 5 */}
            <div className="flex flex-col justify-center gap-3">
              <div className="rounded overflow-hidden" style={{ width: "50px", height: "140px" }}>
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: "url('/apropos.jpeg')", backgroundSize: "600% 320%", backgroundPosition: "80% 25%" }}
                />
              </div>
              <div className="rounded overflow-hidden" style={{ width: "50px", height: "140px" }}>
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: "url('/apropos.jpeg')", backgroundSize: "600% 320%", backgroundPosition: "80% 75%" }}
                />
              </div>
            </div>

            {/* Colonne 6 */}
            <div className="flex flex-col justify-center gap-3">
              <div className="rounded overflow-hidden" style={{ width: "40px", height: "140px" }}>
                <div
                  className="w-full h-full"
                  style={{ backgroundImage: "url('/apropos.jpeg')", backgroundSize: "600% 320%", backgroundPosition: "100% 50%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}