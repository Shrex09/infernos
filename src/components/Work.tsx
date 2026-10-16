import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, scrollToId } from "../lib/motion";
import { projects, Project } from "../data";
import { Eyebrow } from "./ui";

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <li className="proj-item">
    <a
      className="proj"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Visit"
      aria-label={`${project.title} — open live site`}
    >
      <div className="proj-media">
        <img
          className="proj-img"
          src={project.cover}
          alt=""
          width={1600}
          height={1000}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="proj-cta" aria-hidden="true">
          Visit site ↗
        </span>
      </div>
      <div className="proj-row">
        <span className="proj-idx">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="proj-title">{project.title}</h3>
        <span className="proj-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <p className="proj-desc">{project.desc}</p>
      <div className="proj-meta">
        <span>{project.category}</span>
        <span>{project.domain}</span>
        <span>{project.year}</span>
      </div>
    </a>
  </li>
);

/**
 * Project index: a staggered two-column wall of screenshot collages. Each
 * cover bends up into place as it scrolls in, like a page being turned.
 */
const Work: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".proj").forEach((card) => {
        gsap.fromTo(
          card.querySelector(".proj-media"),
          { rotateX: 28, yPercent: 14, scale: 0.94, opacity: 0.2 },
          {
            rotateX: 0,
            yPercent: 0,
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top 98%", end: "top 55%", scrub: 0.6 },
          }
        );
        // The collage drifts inside its frame for a touch of depth
        gsap.fromTo(
          card.querySelector(".proj-img"),
          { yPercent: -4 },
          { yPercent: 4, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } }
        );
        gsap.from(card.querySelectorAll(".proj-row, .proj-desc, .proj-meta"), {
          y: 24,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: card.querySelector(".proj-row"), start: "top 92%" },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} className="section work" data-orb="-1.02 -0.05 0.55 0.45" data-orb-mobile="-1.15 0.55 0.35 0.3">
      <div className="container">
        <div className="work-head">
          <div>
            <Eyebrow index="(02)">Selected work</Eyebrow>
            <h2 className="display-lg" data-split>
              Shipped &amp; running <em className="serif-accent">in production</em>
            </h2>
          </div>
          <p className="work-count">
            <span className="work-count-num">{String(projects.length).padStart(2, "0")}</span> live projects
          </p>
        </div>

        <ul className="work-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </ul>

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
    </section>
  );
};

export default Work;
