JS:
const menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', () => {
  sidebar.style.left = '0';
});

closeBtn.addEventListener('click', () => {
  sidebar.style.left = '-250px';
});