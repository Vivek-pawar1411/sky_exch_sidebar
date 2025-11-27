
  
//     async function loadHTML(id, file) {
//       const el = document.getElementById(id);
//       const res = await fetch(file);
//       const html = await res.text();

//       el.innerHTML = html;
//     }
//     async function initPage() {
//       await loadHTML("header", "/component/header.html");
//       await loadFooter();
//        await mobile_footer();

//       window.toggleSidebar = function () {
//         const sidebar = document.getElementById("sidebar");
//         if (sidebar) {
//           sidebar.classList.toggle("active");
//         } else {
//           console.warn("Sidebar not found in DOM.");
//         }
//       };

//       const currentPage = window.location.pathname;
//   const navLinks = document.querySelectorAll('.navbar a'); 

//   navLinks.forEach(link => {
//     if (link.getAttribute('href') === currentPage) {
//       link.classList.add('active'); 
//     }
//   });
//     }

    
//     async function loadFooter() {
//       const res = await fetch("/component/footer.html");
//       const html = await res.text();
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(html, "text/html");
//       const powerPara = doc.querySelector(".power-para");
//       if (powerPara) powerPara.remove();
//       const footerContent = doc.querySelector("footer") || doc.body;
//       document.getElementById("footer").innerHTML = footerContent.innerHTML;
//     }
    

//       const tabs = document.querySelectorAll(".left-section li");
//     if (tabs.length) {
//       tabs.forEach((tab) => {
//         tab.addEventListener("click", () => {
//           tabs.forEach((t) => t.classList.remove("active"));
//           tab.classList.add("active");
//         });
//       });
//     } else {
//       console.warn("No .left-section li found for active tab toggle.");
//     }

//     // Load chat widget HTML
// fetch("/component/chat-bot.html")
//     .then(res => res.text())
//     .then(html => {
//         document.body.insertAdjacentHTML("beforeend", html);

//         const chatWidget = document.getElementById("chatWidget");
//         const chaticon=document.querySelector(".chat-icon");

//         // Open on chatbot icon click
//         document.querySelector(".chat-icon")?.addEventListener("click", () => {
//             chatWidget.style.display = "block";
//             chaticon.style.display="none";
//         });

//         // Close modal
//         document.getElementById("closeChat").addEventListener("click", () => {
//             chatWidget.style.display = "none";
//             chaticon.style.display="block";

//         });
//     });

//     async function mobile_footer() {
//       const  footer_mob= await fetch("/component/mobile_footer.html");
//       const html=await footer_mob.text();
//       document.getElementById("mobile_footer").innerHTML=html;
      
//     }
//     document.addEventListener("DOMContentLoaded", initPage);
  
// -----------------------------
// Load HTML into a container
// -----------------------------
async function loadHTML(id, file) {
  const el = document.getElementById(id);
  const res = await fetch(file);
  const html = await res.text();
  el.innerHTML = html;
}

// -----------------------------
// Initialize page
// -----------------------------
async function initPage() {
  // Load header first
  await loadHTML("header", "/component/header.html");

  // Load footer and mobile footer
  await loadFooter();
  await mobile_footer();

  // Sidebar toggle function
  window.toggleSidebar = function () {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.toggle("active");
    else console.warn("Sidebar not found in DOM.");
  };

  // -----------------------------
  // Highlight current navbar item
  // -----------------------------
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar a.nav-link'); // only main links

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active'); // add active class
    }
  });

  // -----------------------------
  // Left section tabs toggle
  // -----------------------------
  const tabs = document.querySelectorAll(".left-section li");
  if (tabs.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      });
    });
  } else {
    console.warn("No .left-section li found for active tab toggle.");
  }

  // -----------------------------
  // Load chat widget
  // -----------------------------
  fetch("/component/chat-bot.html")
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);

      const chatWidget = document.getElementById("chatWidget");
      const chaticon = document.querySelector(".chat-icon");

      // Open on chatbot icon click
      chaticon?.addEventListener("click", () => {
        chatWidget.style.display = "block";
        chaticon.style.display = "none";
      });

      // Close chat modal
      document.getElementById("closeChat")?.addEventListener("click", () => {
        chatWidget.style.display = "none";
        chaticon.style.display = "block";
      });
    });
}

// -----------------------------
// Load footer HTML
// -----------------------------
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

// -----------------------------
// Load mobile footer HTML
// -----------------------------
async function mobile_footer() {
  const res = await fetch("/component/mobile_footer.html");
  const html = await res.text();
  document.getElementById("mobile_footer").innerHTML = html;
}

// -----------------------------
// Run initPage on DOMContentLoaded
// -----------------------------
document.addEventListener("DOMContentLoaded", initPage);
