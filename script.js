document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));

  const checks = [...document.querySelectorAll('.guide-list input[type="checkbox"]')];
  const progress = document.getElementById('progress');
  const bar = document.getElementById('progressBar');
  function updateProgress(){
    if(!progress || !bar) return;
    const done = checks.filter(c => c.checked).length;
    progress.textContent = `${done} / ${checks.length}`;
    bar.style.width = `${checks.length ? done/checks.length*100 : 0}%`;
  }
  checks.forEach(c => c.addEventListener('change', updateProgress));
  updateProgress();

  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');
  if(form) form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    msg.textContent = `Merci ${name} ! Votre message a bien été préparé. (Démo pédagogique : aucun serveur n'est connecté.)`;
    form.reset();
  });
});