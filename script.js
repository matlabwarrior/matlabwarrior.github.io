// === Portfolio Starter Script ===

// 1. Confirm JS is connected
console.log("✅ script.js is linked and running!");

// 2. Example: Dark mode toggle
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "🌙 Toggle Dark Mode";
toggleBtn.style.position = "fixed";
toggleBtn.style.bottom = "20px";
toggleBtn.style.right = "20px";
toggleBtn.style.padding = "10px 15px";
toggleBtn.style.borderRadius = "8px";
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// 3. Example: Parallax scroll effect for .parallax-bg
window.addEventListener("scroll", () => {
  const bg = document.querySelector(".parallax-bg");
  if (bg) {
    let offset = window.scrollY * 0.5; // slower scroll
    bg.style.transform = `translateY(${offset}px)`;
  }
});