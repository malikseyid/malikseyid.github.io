// Reusable site script: active nav + footer year
document.addEventListener('DOMContentLoaded', function(){
  // Highlight active navigation link
  var links = document.querySelectorAll('.site-nav a');
  links.forEach(function(a){
    try{
      var href = a.getAttribute('href');
      if(!href) return;
      var current = window.location.pathname.split('/').pop() || 'index.html';
      // treat root as index.html
      if(href === current || (href === 'index.html' && current === '')){
        a.classList.add('active');
      }
    }catch(e){/* ignore */}
  });

  // Set current year in footer if present
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
});
