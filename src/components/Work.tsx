import React, { useEffect, useRef, useState } from "react";
import { gsap, isTouch, scrollToId } from "../lib/motion";
import { projects, Project } from "../data";
import { Eyebrow } from "./ui";

const WorkCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const card = useRef<HTMLAnchorElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  // Play only while on screen — ten autoplaying videos would melt a phone
  useEffect(() => {
    const el = card.current;
    const v = video.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 3D tilt toward the pointer
  useEffect(() => {
    const el = card.current;
    if (!el || isTouch()) return;
    const media = el.querySelector<HTMLElement>(".wcard-media");
    if (!media) return;
    const rx = gsap.quickTo(media, "rotateX", { duration: 0.8, ease: "power3" });
    const ry = gsap.quickTo(media, "rotateY", { duration: 0.8, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = media.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 10);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
      media.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      media.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <a
      ref={card}
      className="wcard"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Visit"
      aria-label={`${project.title} — open live site`}
    >
      <div className="wcard-media">
        <video ref={video} src={project.video} poster={project.poster} muted loop playsInline preload="none" className="wcard-video" />
        <div className="wcard-shine" />
        <span className="wcard-domain">↗ {project.domain}</span>
      </div>
      <div className="wcard-info">
        <span className="wcard-idx">{String(index + 1).padStart(2, "0")}</span>
        <div className="wcard-text">
          <h3 className="wcard-title">{project.title}</h3>
          <p className="wcard-desc">{project.desc}</p>
        </div>
        <div className="wcard-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </a>
  );
};

const Work: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 821px)", () => {
      const track = el.querySelector<HTMLElement>(".work-track")!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ".work-pin",
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(".work-progress-fill", { scaleX: self.progress });
            setCurrent(Math.min(projects.length, Math.floor(self.progress * projects.length) + 1));
          },
        },
      });
      // Inner parallax: each video slides against its card as the track moves
      gsap.utils.toArray<HTMLElement>(".wcard-video").forEach((v) => {
        gsap.fromTo(
          v,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: v.closest(".wcard"), containerAnimation: tween, start: "left right", end: "right left", scrub: true },
          }
        );
      });
    });
    mm.add("(max-width: 820px)", () => {
      gsap.utils.toArray<HTMLElement>(".wcard").forEach((c) => {
        gsap.from(c, { y: 80, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 90%" } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={root} className="work" data-orb="-1.02 -0.05 0.55 0.45" data-orb-mobile="-1.15 0.55 0.35 0.3">
      <div className="work-pin">
        <div className="container work-head">
          <div>
            <Eyebrow index="(02)">Selected work</Eyebrow>
            <h2 className="display-lg" data-split>
              Shipped &amp; running <em className="serif-accent">in production</em>
            </h2>
          </div>
          <div className="work-counter" aria-hidden="true">
            <span className="work-counter-num">{String(current).padStart(2, "0")}</span>
            <span className="work-counter-total">/ {String(projects.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="work-track">
          {projects.map((p, i) => (
            <WorkCard key={p.title} project={p} index={i} />
          ))}
          <div className="work-end">
            <p>Your product could be next.</p>
            <a
              href="#contact"
              className="work-end-link"
              data-cursor="Talk"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact");
              }}
            >
              Start a project ↗
            </a>
          </div>
        </div>

        <div className="container work-foot">
          <div className="work-progress">
            <div className="work-progress-fill" />
          </div>
          <span className="work-hint">Keep scrolling →</span>
        </div>
      </div>
    </section>
  );
};

export default Work;
