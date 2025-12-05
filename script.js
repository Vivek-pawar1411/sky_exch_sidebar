async function loadHTML(id, file) {
  const el = document.getElementById(id);
  const res = await fetch(file);
  const html = await res.text();
  el.innerHTML = html;
}

// Initialize page
async function initPage() {
  // Load header first
  await loadHTML("header", "/component/header.html");

  // Load footer and mobile footer
  await loadFooter();
  await mobile_footer();

  // Event Delegation for multiple dynamic actions
  document.addEventListener("click", function (e) {
    const chatWidget = document.getElementById("chatWidget");
    const sidebar = document.getElementById("sidebar");

    // Chat icon click
    if (e.target.classList.contains("chat-icon") && chatWidget) {
      chatWidget.style.display = "block";
      e.target.style.display = "none";
    }

    // Close chat modal
    if (e.target.id === "closeChat" && chatWidget) {
      chatWidget.style.display = "none";
      const chaticon = document.querySelector(".chat-icon");
      if (chaticon) chaticon.style.display = "block";
    }

    // Sidebar toggle (mobile)
    if (e.target.id === "sidebarToggle" && sidebar) {
      sidebar.classList.toggle("active");
    }

    // Left-section tabs
    if (e.target.closest(".left-section li")) {
      const tabs = document.querySelectorAll(".left-section li");
      tabs.forEach((t) => t.classList.remove("active"));
      e.target.closest("li").classList.add("active");
    }
  });

// Highlight navbar with HOME as default active
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.navbar a.nav-link');

let matched = false;

// Match current page
navLinks.forEach(link => {
  const linkPage = link.getAttribute('href').split('/').pop();
  if (linkPage === currentPage) {
    link.classList.add('active');
    matched = true;
  }
});

// If no match → set Home active
if (!matched) {
  const homeLink = document.querySelector('.navbar a[href="/index.html"], .navbar a[href="index.html"]');
  if (homeLink) homeLink.classList.add("active");
}


  // Load chat widget
  fetch("/component/chat-bot.html")
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);
    });
}

// Load footer HTML
async function loadFooter() {
  const res = await fetch("/component/footer.html");
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const powerPara = doc.querySelector(".power-para");
  if (powerPara) powerPara.remove();
  const footerContent = doc.querySelector("footer") || doc.body;
  document.getElementById("footer").innerHTML = footerContent.innerHTML;
}

// Load mobile footer HTML
async function mobile_footer() {
  const res = await fetch("/component/mobile_footer.html");
  const html = await res.text();
  document.getElementById("mobile_footer").innerHTML = html;
}

// Run initPage on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initPage);

