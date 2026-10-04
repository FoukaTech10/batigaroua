/* BâtiGaroua — interactions JavaScript */
document.addEventListener("DOMContentLoaded", function () {

  /* 1. Menu mobile */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
    });
  }

  /* 2. Bouton retour en haut */
  var haut = document.getElementById("haut");
  if (haut) {
    window.addEventListener("scroll", function () {
      haut.style.display = window.scrollY > 400 ? "block" : "none";
    });
    haut.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* 3. Checklist interactive + progression (page guide) */
  var cases = document.querySelectorAll(".check-item input");
  if (cases.length) {
    var barre = document.getElementById("barre");
    var compteur = document.getElementById("compteur");
    var msg = document.getElementById("msg-progress");
    var CLE = "batigaroua-checklist";
    var etat = {};
    try { etat = JSON.parse(localStorage.getItem(CLE)) || {}; } catch (e) { etat = {}; }

    function maj() {
      var total = cases.length, coche = 0;
      cases.forEach(function (c) { if (c.checked) coche++; });
      var pct = Math.round((coche / total) * 100);
      compteur.textContent = coche + " / " + total + " points validés (" + pct + " %)";
      barre.style.width = pct + "%";
      barre.parentElement.setAttribute("aria-valuenow", pct);
      if (pct === 0) msg.textContent = "Cochez les points au fur et à mesure de votre préparation.";
      else if (pct < 50) msg.textContent = "Bon début ! Continuez la préparation de votre projet.";
      else if (pct < 100) msg.textContent = "Vous avancez bien : plus de la moitié des points sont validés.";
      else msg.textContent = "Checklist complète ! Faites relire votre projet par un professionnel avant les travaux.";
    }
    cases.forEach(function (c, i) {
      c.checked = !!etat[i];
      c.addEventListener("change", function () {
        etat[i] = c.checked;
        try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) {}
        maj();
      });
    });
    var reset = document.getElementById("reset");
    if (reset) reset.addEventListener("click", function () {
      cases.forEach(function (c) { c.checked = false; });
      etat = {};
      try { localStorage.removeItem(CLE); } catch (e) {}
      maj();
    });
    maj();
  }

  /* 4. Formulaire de contact (démonstration, validation côté navigateur) */
  var form = document.getElementById("form-contact");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var retour = document.getElementById("retour-form");
      retour.className = ""; retour.textContent = "";

      function verifier(id, test, message) {
        var champ = document.getElementById(id);
        var err = document.getElementById("err-" + id);
        if (!test(champ.value.trim())) {
          err.textContent = message; champ.classList.add("champ-invalide"); ok = false;
        } else { err.textContent = ""; champ.classList.remove("champ-invalide"); }
      }
      verifier("nom", function (v) { return v.length >= 2; }, "Veuillez saisir votre nom (2 caractères minimum).");
      verifier("email", function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }, "Veuillez saisir une adresse e-mail valide.");
      verifier("sujet", function (v) { return v !== ""; }, "Veuillez choisir un sujet.");
      verifier("message", function (v) { return v.length >= 10; }, "Votre message doit contenir au moins 10 caractères.");

      if (ok) {
        var nom = document.getElementById("nom").value.trim();
        retour.className = "ok";
        retour.textContent = "Merci " + nom + " ! Votre message a bien été enregistré (formulaire de démonstration : aucun envoi réel n'est effectué).";
        form.reset();
      }
    });
  }

  /* 5. Année dans le pied de page */
  var an = document.getElementById("annee");
  if (an) an.textContent = new Date().getFullYear();
});
