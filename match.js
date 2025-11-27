    const container = document.getElementById("match-row");
    const sportType = container.getAttribute("data-sport");  // Cricket / Soccer / Esoccer

    fetch("/data/matches_data.json")
        .then(res => res.json())
        .then(data => {

            // Agar sport exist nahi karta to return
            if (!data[sportType]) return;
            data[sportType].forEach(m => {
                const html = `
                    <div class="match-row">
                        <div class="match-info">
                            <a href="${m.link}">${m.title}</a>
                            <div class="time-icons">
                                <span>${m.status}</span>
                                <img src="${m.icon}" style="width:50px;">
                                <img src="${m.play_icon}">
                            </div>
                        </div>
                        <div class="odds">
                            <span class="match-code">${m.match_code}</span>
                            <div class="odds-box blue">${m.odds.blue1}</div>
                            <div class="odds-box pink">${m.odds.pink1}</div>
                            <div class="odds-box blue">${m.odds.blue2}</div>
                            <div class="odds-box pink">${m.odds.pink2}</div>
                            <div class="odds-box blue">${m.odds.blue3}</div>
                            <div class="odds-box pink">${m.odds.pink3}</div>
                        </div>
                            <img src="${m.img}">

                    </div>
                `;
                container.insertAdjacentHTML("beforeend", html);
            });

        });

