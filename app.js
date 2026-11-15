const app = document.getElementById("app");

const API_URL = "https://jsonplaceholder.typicode.com/users";

const stanje = {
    korisnici: [],
    ucitavanje: false,
    greska: null,
};

function prikaziPocetnu() {
    app.innerHTML = `
    <h1>Dobrodošli</h1>
    <p>Ovo je početna stranica jednostranične web aplikacije (SPA).</p>
    <p>Kliknite na <a href="#/korisnici">Korisnici</a> i primijetite da se
       stranica ne učitava ponovno, nego JavaScript samo zamijeni sadržaj.</p>
  `;
}

async function prikaziKorisnike() {
    app.innerHTML = `
    <h1>Korisnici</h1>
    <div id="popis"></div>
  `;

    if (stanje.korisnici.length === 0) {
        iscrtajPopis();
        await ucitajKorisnike();
    }
    iscrtajPopis();
}

function prikaziOAplikaciji() {
    app.innerHTML = `
    <h1>O aplikaciji</h1>
    <p>Mini SPA prikazuje osnovne dijelove jednostranične aplikacije:</p>
    <ul>
      <li>jedan HTML dokument (<code>index.html</code>)</li>
      <li>usmjeravanje pomoću <code>location.hash</code></li>
      <li>mijenjanje sadržaja kroz DOM</li>
      <li>događaje (klik, unos teksta, promjena adrese)</li>
      <li>dohvaćanje JSON podataka pomoću <code>fetch()</code></li>
    </ul>
    <p>Podaci o korisnicima dolaze s
       <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener">JSONPlaceholder</a> API-ja.</p>
  `;
}

function prikaziGresku() {
    app.innerHTML = `
    <h1>Stranica nije pronađena</h1>
    <p>Tražena putanja ne postoji. Vratite se na
       <a href="#/">početnu stranicu</a>.</p>
  `;
}

async function ucitajKorisnike() {
    stanje.ucitavanje = true;
    stanje.greska = null;

    try {
        const odgovor = await fetch(API_URL);
        if (!odgovor.ok) {
            throw new Error("Poslužitelj je vratio status " + odgovor.status);
        }
        stanje.korisnici = await odgovor.json();
    } catch (greska) {
        console.error("Greška pri dohvaćanju:", greska);
        stanje.greska =
            "Podatke nije moguće učitati. Provjerite internetsku vezu.";
    }

    stanje.ucitavanje = false;
}

function iscrtajPopis() {
    const popis = document.getElementById("popis");
    if (!popis) return;

    if (stanje.ucitavanje) {
        popis.innerHTML = `<p class="poruka">Učitavanje…</p>`;
        return;
    }

    if (stanje.greska) {
        popis.innerHTML = `
      <div class="poruka greska">
        <p>${stanje.greska}</p>
        <button class="ponovi">Pokušaj ponovno</button>
      </div>`;
        return;
    }

    popis.innerHTML = stanje.korisnici
        .map(
            (k) => `
    <div class="card">
      <h3>${k.name}</h3>
      <p>${k.email}</p>
      <small>${k.company.name}</small>
    </div>
  `,
        )
        .join("");
}

app.addEventListener("click", async (e) => {
    if (e.target.closest(".ponovi")) {
        stanje.ucitavanje = true;
        iscrtajPopis();
        await ucitajKorisnike();
        iscrtajPopis();
    }
});

const rute = {
    "/": { prikaz: prikaziPocetnu, naslov: "Početna" },
    "/korisnici": { prikaz: prikaziKorisnike, naslov: "Korisnici" },
    "/o-aplikaciji": { prikaz: prikaziOAplikaciji, naslov: "O aplikaciji" },
};

function oznaciAktivno(put) {
    document.querySelectorAll("nav a").forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + put);
    });
}

function usmjeri() {
    const put = location.hash.slice(1) || "/";
    const ruta = rute[put];

    if (ruta) {
        ruta.prikaz();
        document.title = ruta.naslov + " – Mini SPA";
    } else {
        prikaziGresku();
        document.title = "Nije pronađeno – Mini SPA";
    }

    oznaciAktivno(put);
    window.scrollTo(0, 0);
}

window.addEventListener("hashchange", usmjeri);
window.addEventListener("load", usmjeri);
