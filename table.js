const betBox = document.getElementById("betBoxCustom");
function resetBox() {
  betBox.style.background = "";
  betBox.querySelector(".bet-options").style.background = "";
  betBox.querySelector(".bet-amounts").style.background = "";
}

// CLICK HANDLER FOR ALL ODDS
document.addEventListener("click", function (e) {

  // MATCH ODDS (safe)
  if (e.target.classList.contains("odds-back") ||
      e.target.classList.contains("odds-lay")) {

    const matchTable = document.getElementById("matchOddsTable");
    if (!matchTable) return; 

    resetBox();
    const isLay = e.target.classList.contains("odds-back");

    matchTable.after(betBox);
    //   const clickedRow = e.target.closest(".table-match-odds-row");  
    // if (clickedRow) clickedRow.after(betBox);   
    betBox.classList.add("active");
    // betBox.querySelector(".bet-odds").textContent = e.target.textContent.trim();
    let price = e.target.childNodes[0].textContent.trim();  
betBox.querySelector(".bet-odds").textContent = price;


    betBox.style.background = isLay ? "#ffe5ec" : "#d7e9fa";
    betBox.querySelector(".bet-options").style.background = isLay ? "#ffc2d1" : "#b6daf9";
    betBox.querySelector(".bet-amounts").style.background = isLay ? "#ffd6e0" : "#cbe3fa";
  }

  // BOOKMAKER odds (safe)
  if (e.target.classList.contains("bk-btn")) {

    const bkWrapper = document.querySelector(".bk-wrapper");
    if (!bkWrapper) return; 

    resetBox();
    const isLay = e.target.classList.contains("bk-lay");

    bkWrapper.after(betBox);
    //     const bkRow = e.target.closest(".bk-row");   
    // if (bkRow) bkRow.after(betBox);   
    betBox.classList.add("active");
    betBox.querySelector(".bet-odds").textContent = e.target.textContent.trim();

    betBox.style.background = isLay ? "#ffe5ec" : "#d7e9fa";
    betBox.querySelector(".bet-options").style.background = isLay ? "#ffc2d1" : "#b6daf9";
    betBox.querySelector(".bet-amounts").style.background = isLay ? "#ffd6e0" : "#cbe3fa";
  }

  //fancy-odd

if (e.target.classList.contains("no") ||
    e.target.classList.contains("yes")) {

//     resetBox();
//     const isLay = e.target.classList.contains("no");

//     const holderRow = document.getElementById("betBoxRow");
//     const holderCell = document.getElementById("betBoxCell");

//     holderRow.style.display = "block";
//     holderCell.appendChild(betBox);

//     const row = e.target.closest(".fancy-row");
// document.getElementById("fancyBetHolder").appendChild(holderRow);

 resetBox();
    const isLay = e.target.classList.contains("no");

    const row = e.target.closest(".fancy-row");
    if (row) row.after(betBox);   // FIXED

    betBox.classList.add("active");
    betBox.querySelector(".bet-odds").textContent = e.target.querySelector(".rate")?.textContent.trim() ||
                                                   e.target.textContent.trim();

    betBox.style.background = isLay ? "#ffe5ec" : "#d7e9fa";
    betBox.querySelector(".bet-options").style.background = isLay ? "#ffc2d1" : "#b6daf9";
    betBox.querySelector(".bet-amounts").style.background = isLay ? "#ffd6e0" : "#cbe3fa";
}

});

// CANCEL BET
document.querySelector(".bet-cancel").addEventListener("click", () => {
  betBox.classList.remove("active");
  document.body.appendChild(betBox);
});

// PLACE BET
document.querySelector(".bet-place").addEventListener("click", () => {
  alert("✅ Bet Placed Successfully!");
  betBox.classList.remove("active");
  document.body.appendChild(betBox);
});

// QUICK AMOUNTS
betBox.querySelectorAll(".bet-amounts button").forEach(btn => {
  btn.addEventListener("click", () => {
    betBox.querySelector("input[type='number']").value = btn.textContent.trim();
  });
});

// LOAD ALL DATA FROM JSON
document.addEventListener("DOMContentLoaded", () => {
  fetch("/data/b_f_m_data.json").then(res => res.json()).then(data => {

    // MATCH ODDS (safe)
    const matchDiv = document.getElementById("matchOddsTable");
    if (matchDiv) {
      data.matchodds.forEach(m => {
        const row = document.createElement("div");
        row.className = "table-match-odds-row";

        row.innerHTML = `
          <div class="match-odds-name">${m.team}</div>
          ${m.back.map(v => `<div class='odds-back'>${v.price}<br>${v.volume}</div>`).join("")}
          ${m.lay.map(v => `<div class='odds-lay'>${v.price}<br>${v.volume}</div>`).join("")}
        `;

        matchDiv.appendChild(row);
      });
    }

    // BOOKMAKER (safe)
    const bkDiv = document.getElementById("bk-row");
    if (bkDiv) {
      data.bookmaker.forEach(b => {
        const row = document.createElement("div");
        row.className = "bk-row";

        row.innerHTML = `
          <div class="bk-name">${b.name}</div>
          <div class="bk-odds">
            <div class="bk-price small">${b.odds.left[0] || ""}</div>
            <div class="bk-price small">${b.odds.left[1] || ""}</div>

            <button class="bk-btn bk-back">${b.odds.back}</button>
            <button class="bk-btn bk-lay">${b.odds.lay}</button>

            <div class="bk-price small faded">${b.odds.right[0] || ""}</div>
            <div class="bk-price small faded">${b.odds.right[1] || ""}</div>
          </div>
        `;

        bkDiv.appendChild(row);
      });
    }


    const fancyContainer = document.getElementById("fancyContainer");

if (fancyContainer) {
  data.fancy.forEach(f => {
    const row = document.createElement("div");
    row.className = "fancy-row";

    row.innerHTML = `
      <div class="fancy-cell">${f.title}</div>

      <div class="fancy_min-max">

<div class="fancy_yes-no">
    <div class="fancy-cell no">
      <div class="rate">${f.no.rate}</div>
      <div class="min">${f.no.min}</div>
  </div>

  <div class="fancy-cell yes">
      <div class="rate">${f.yes.rate}</div>
      <div class="min">${f.yes.min}</div>
  </div>
    </div>

      <div class="fancy-cell minmax hide-mobile">
        <dl><dt>Min/Max</dt><dd>${f.minmax}</dd></dl>
      </div>
       </div>

    `;

    fancyContainer.appendChild(row);
  });
}
  });
});
