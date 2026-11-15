const app = document.getElementById("app");

function prikaziPocetnu() {
    app.innerHTML = `
    <h1>Dobrodošli</h1>
    <p>Ovo je početna stranica jednostranične web aplikacije (SPA).</p>
    <p>Kliknite na <a href="#/korisnici">Korisnici</a> i primijetite da se
       stranica ne učitava ponovno, nego JavaScript samo zamijeni sadržaj.</p>
  `;
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

function usmjeri() {
    const put = location.hash.slice(1) || "/";

    if (put === "/") {
        prikaziPocetnu();
    } else if (put === "/o-aplikaciji") {
        prikaziOAplikaciji();
    } else {
        prikaziGresku();
    }
}

window.addEventListener("hashchange", usmjeri);
window.addEventListener("load", usmjeri);
