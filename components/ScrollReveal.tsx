"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -40px 0px",
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          intersectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const setupElement = (el: Element) => {
      if (
        el.classList.contains("active") ||
        el.classList.contains("no-reveal") ||
        el.closest(".no-reveal") ||
        el.classList.contains("word-split-done")
      ) {
        return;
      }

      // Automatically split headings with text content into bouncy springy word spans
      if (el.tagName === "H2" || el.tagName === "H1" || el.classList.contains("reveal-text")) {
        const text = el.textContent || "";
        // Only split if it's text content and doesn't contain HTML tags (to avoid breaking custom icons/spans)
        if (el.children.length === 0 && text.trim().length > 0) {
          const words = text.split(/\s+/);
          el.innerHTML = words
            .map(
              (word, i) =>
                `<span class="word-span" style="transition-delay: ${i * 45}ms">${word}</span>`
            )
            .join(" ");
          el.classList.add("word-split-done");
        }
      }

      el.classList.add("reveal-text");
      intersectionObserver.observe(el);
    };

    // Scan initial elements
    const scanAndObserve = () => {
      const elements = document.querySelectorAll(
        "h1, h2:not(.no-reveal), h3:not(.no-reveal), h4:not(.no-reveal), .reveal-text"
      );
      elements.forEach(setupElement);
    };

    scanAndObserve();

    // Observe newly added elements (hydration)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            if (
              el.matches("h1, h2, h3, h4, .reveal-text") &&
              !el.classList.contains("no-reveal")
            ) {
              setupElement(el);
            }
            el.querySelectorAll(
              "h1, h2:not(.no-reveal), h3:not(.no-reveal), h4:not(.no-reveal), .reveal-text"
            ).forEach(setupElement);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Highly optimized scrolling parallax engine using RequestAnimationFrame
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const viewportHeight = window.innerHeight;

          // Parallax effect on backgrounds/images/cards with data-scroll-speed
          const parallaxEls = document.querySelectorAll("[data-scroll-speed]");
          parallaxEls.forEach((el) => {
            const speed = parseFloat(el.getAttribute("data-scroll-speed") || "0");
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + scrolled;
            
            // Translate the element based on its viewport offset
            const offset = (scrolled + viewportHeight / 2 - elementTop) * speed;
            
            // Keep existing transforms or combine them
            const targetEl = el as HTMLElement;
            targetEl.style.transform = `translateY(${offset}px)`;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Trigger initial positioning
    handleScroll();

    const timer = setTimeout(scanAndObserve, 250);

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
