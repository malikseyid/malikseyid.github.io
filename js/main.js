// Basic site JS
document.addEventListener('DOMContentLoaded', function(){
  // small helper: mark active nav link
  var links = document.querySelectorAll('.site-nav a');
  links.forEach(function(a){
    if(window.location.pathname.endsWith(a.getAttribute('href')) || (a.getAttribute('href') === 'index.html' && (window.location.pathname === '' || window.location.pathname.endsWith('/')))){
      a.classList.add('active');
    }
  });
});
