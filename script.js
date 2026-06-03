/* ================================================================
   PORTFOLIO SCRIPT
   This file does four things:
     1. Renders project cards from the PROJECTS array below
     2. Opens / closes the project modal
     3. Highlights the active nav link as you scroll
     4. Animates sections into view as you scroll to them
     5. Handles the mobile hamburger menu
     6. Sets the current year in the footer
================================================================ */


/* ----------------------------------------------------------------
   1. YOUR PROJECTS
   Add or remove objects in this array to manage your projects.
   Each project needs:
     - title:    (string)  displayed on the card and in the modal
     - tags:     (array)   short labels like "Python" or "React"
     - summary:  (string)  short text shown on the card (1–2 sentences)
     - detail:   (string)  longer description shown in the modal
     - links:    (array)   each link needs a "label" and "url"
                           set url to "" to hide that link
---------------------------------------------------------------- */
const PROJECTS = [
  {
    id: "my-project",           // ← new, unique per project
    image: "images/frontpage.png",   // ← new, or "" if none yet
    title: "Master Thesis",               
    tags: ["Ansys", "X"],          
    summary: "Master thesis @ Volvo Trucks Technology - Electromobility", 
    detail: `Investigated and developed a new, Patent-pending busbar fixation method. This was achieved by working closely with stakeholders and finding "hidden" needs/information through interviews and brainstorming sessions. One thing I learned was: At the brainstorming sessions, the communication was not hindered by some formal interview barrier - but encouraged by creativity and a common goal in problem solving. 
              Keywords: Electrical creepage, strength analysis, material- and design optimization.`, 
    links: [
      { label: "Link to thesis", url: "https://odr.chalmers.se/items/de957476-4715-4f94-ad95-ba9055f16881" }, 
      { label: "Live Demo", url: "" },  // ← Replace url or leave "" to hide this link
    ],
      
  },
  {
    id: "Matify",      // ← add, unique per project, no spaces
    image: "",   // ← add, or "" if no image yet
    title: "Matify",
    tags: ["Python", "API"],
    summary: "Rational Recipe Recommender.",
    detail: `Matify takes your preferred grocery stores and compiles the most rational recipes based on your taste and preferences.`,
    links: [
      { label: "GitHub", url: "" },
      { label: "Live Demo", url: "" },
    ],
  },
  {
    id: "SMA200",      // ← add, unique per project, no spaces
    image: "",   
    title: "SMA200 Graph LCD Project",
    tags: ["Python", "Electronics hardware", "Data Analysis"],
    summary: "Marking stock tickers when below SMA200.",
    detail: `Using public data pull, process it and display with own UI on a LCD screen using ESP32 microcontroller`,
    links: [
      { label: "GitHub", url: "https://github.com/your-username/project-three" },
    ],
  },
];


/* ----------------------------------------------------------------
   2. RENDER PROJECT CARDS
   Loops over PROJECTS and creates a card element for each one.
   You don't need to touch this — just edit the array above.
---------------------------------------------------------------- */
function renderProjects() {
  const grid = document.getElementById("projects-grid");

  PROJECTS.forEach((project, index) => {
    // Build the tag pills HTML
    const tagsHTML = project.tags
      .map(tag => `<span class="project-tag">${tag}</span>`)
      .join("");

    // Create the card element
    const imageHTML = project.image
      ? `<img src="${project.image}" alt="${project.title} screenshot" class="project-image" />`
      : "";

    const card = document.createElement("div");
    card.className = "project-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `View details for ${project.title}`);
    card.setAttribute("data-project-id", project.id);
    card.innerHTML = `
      ${imageHTML}
      <h3>${project.title}</h3>`;

    // Open modal when clicked or activated by keyboard (Enter / Space)
    card.addEventListener("click", () => openModal(index));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openModal(index);
    });

    grid.appendChild(card);
  });
}


/* ----------------------------------------------------------------
   3. MODAL — OPEN & CLOSE
   openModal fills the modal with the clicked project's data,
   then makes it visible by adding the "open" class.
---------------------------------------------------------------- */
const overlay = document.getElementById("modal-overlay");
const modalImage = document.querySelector(".modal-image");
const modalTitle = document.querySelector(".modal-title");
const modalTags  = document.querySelector(".modal-tags");
const modalDesc  = document.querySelector(".modal-desc");
const modalLinks = document.querySelector(".modal-links");
const closeBtn   = document.querySelector(".modal-close");

function openModal(index) {
  const project = PROJECTS[index];
 
  // Show or hide the image in the modal
  if (project.image) {
    modalImage.src = project.image;
    modalImage.alt = `${project.title} screenshot`;
    modalImage.style.display = "block";
  } else {
    modalImage.style.display = "none";
  }
 
  // Show or hide the image in the modal
  if (project.image) {
    modalImage.src = project.image;
    modalImage.alt = `${project.title} screenshot`;
    modalImage.style.display = "block";
  } else {
    modalImage.style.display = "none";
  }

  // Fill in the modal content
  modalTitle.textContent = project.title;


  // Fill in the modal content
  modalTitle.textContent = project.title;
 
  // Build tag pills
  modalTags.innerHTML = project.tags
    .map(tag => `<span class="project-tag">${tag}</span>`)
    .join("");
 
  // Full description
  modalDesc.textContent = project.detail;
 
  // Links — only render links that have a non-empty url
  modalLinks.innerHTML = project.links
    .filter(link => link.url)
    .map(link => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`)
    .join("");
 
  // Show the modal
  overlay.classList.add("open");
 
  // Move keyboard focus to the close button for accessibility
  closeBtn.focus();
 
  // Prevent the page body from scrolling while modal is open
  document.body.style.overflow = "hidden";
}
 
function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";   // restore scrolling
}
 
// Close when clicking the × button
closeBtn.addEventListener("click", closeModal);
 
// Close when clicking the dark backdrop (outside the modal box)
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});
 
// Close when pressing Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
});

// "See project →" links on experience cards
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-open-project]");
  if (!link) return;
  e.preventDefault();
  const projectId = link.getAttribute("data-open-project");
  const index = PROJECTS.findIndex(p => p.id === projectId);
  if (index !== -1) openModal(index);
});


/* ----------------------------------------------------------------
   4. ACTIVE NAV LINK ON SCROLL
   Uses IntersectionObserver to detect which section is visible,
   then adds the "active" class to the matching nav link.
---------------------------------------------------------------- */
const navLinks = document.querySelectorAll(".nav-links a");

// Observe every section and the hero
const sectionsToObserve = document.querySelectorAll("section[id], #hero");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove active from all links
        navLinks.forEach(link => link.classList.remove("active"));

        // Add active to the link pointing to this section
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  {
    // Trigger when the section reaches the middle of the viewport
    rootMargin: "-40% 0px -55% 0px",
  }
);

sectionsToObserve.forEach(section => navObserver.observe(section));


/* ----------------------------------------------------------------
   5. FADE-IN ANIMATION ON SCROLL
   Adds the "visible" class to each section when it enters view.
   The CSS handles the actual fade-up animation.
---------------------------------------------------------------- */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.1 }  // trigger when 10% of the element is visible
);

document.querySelectorAll(".section, #hero").forEach(el => fadeObserver.observe(el));


/* ----------------------------------------------------------------
   6. MOBILE HAMBURGER MENU
   Toggles the "open" class on the nav link list.
   The CSS shows/hides it based on that class.
---------------------------------------------------------------- */
const navToggle = document.querySelector(".nav-toggle");
const navLinksList = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinksList.classList.toggle("open");
});

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinksList.classList.remove("open");
  });
});


/* ----------------------------------------------------------------
   7. FOOTER YEAR
   Automatically keeps the copyright year current.
---------------------------------------------------------------- */
document.getElementById("footer-year").textContent = new Date().getFullYear();


/* ----------------------------------------------------------------
   INITIALISE
   Run everything that needs to happen on page load.
---------------------------------------------------------------- */
renderProjects();
