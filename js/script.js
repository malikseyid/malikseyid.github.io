// Reusable site script: active nav, footer year, smooth scroll, mobile nav toggle, and project modal
(function(){
  function onReady(fn){
    if(document.readyState === 'complete' || document.readyState === 'interactive'){
      setTimeout(fn, 0);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  onReady(function(){
    // Highlight active navigation link
    var links = document.querySelectorAll('.site-nav a');
    var current = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(function(a){
      try{
        var href = a.getAttribute('href');
        if(!href) return;
        if(href === current || (href === 'index.html' && (current === '' || current === 'index.html'))){
          a.classList.add('active');
        }
      }catch(e){/* ignore */}
    });

    // Set current year in footer if present
    var y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();

    // Smooth scroll for same-page anchors
    document.body.addEventListener('click', function(e){
      var el = e.target.closest('a[href^="#"]');
      if(!el) return;
      var hash = el.getAttribute('href');
      if(!hash || hash === '#') return; // ignore placeholder anchors
      var target = document.querySelector(hash);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        history.replaceState && history.replaceState(null, '', hash);
      }
    });

    // Mobile nav toggle (adds a simple toggle button and manages nav display)
    (function(){
      var headerInner = document.querySelector('.header-inner');
      var nav = document.querySelector('.site-nav');
      if(!headerInner || !nav) return;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-toggle';
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-label','Toggle navigation');
      btn.innerHTML = '☰';
      // insert before nav
      headerInner.insertBefore(btn, nav);

      function updateNavForWidth(){
        if(window.innerWidth <= 600){
          if(!nav.dataset.origDisplay) nav.dataset.origDisplay = window.getComputedStyle(nav).display || 'flex';
          nav.style.display = 'none';
          btn.style.display = 'inline-block';
        } else {
          nav.style.display = nav.dataset.origDisplay || '';
          btn.style.display = 'none';
          btn.setAttribute('aria-expanded','false');
        }
      }
      // initial
      updateNavForWidth();
      window.addEventListener('resize', updateNavForWidth);

      btn.addEventListener('click', function(){
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        if(isOpen){
          nav.style.display = 'none';
          btn.setAttribute('aria-expanded','false');
        } else {
          nav.style.display = 'flex';
          btn.setAttribute('aria-expanded','true');
        }
      });
    })();

    // Project details modal (for "View details" links inside .project-card)
    (function(){
      function createModal(){
        var overlay = document.createElement('div');
        overlay.className = 'project-modal-overlay';
        Object.assign(overlay.style,{
          position:'fixed', inset:0, background:'rgba(2,6,23,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999
        });

        var dialog = document.createElement('div');
        dialog.className = 'project-modal';
        Object.assign(dialog.style,{
          width:'min(920px,96%)', maxHeight:'90vh', overflowY:'auto', background:'#fff', borderRadius:'12px', boxShadow:'0 20px 50px rgba(2,6,23,0.3)', padding:'1rem'
        });

        var close = document.createElement('button');
        close.innerHTML = 'Close';
        Object.assign(close.style,{position:'absolute', right:'1rem', top:'1rem'});
        close.className = 'modal-close';

        var content = document.createElement('div');
        content.className = 'project-modal-content';

        dialog.appendChild(close);
        dialog.appendChild(content);
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function(ev){
          if(ev.target === overlay) close.click();
        });
        close.addEventListener('click', function(){
          document.body.removeChild(overlay);
        });

        return {overlay: overlay, content: content};
      }

      document.body.addEventListener('click', function(e){
        var a = e.target.closest('.project-links a');
        if(!a) return;
        e.preventDefault();
        // find project card
        var card = a.closest('.project-card');
        if(!card) return;
        var img = card.querySelector('.project-image');
        var title = card.querySelector('.project-title') ? card.querySelector('.project-title').textContent : '';
        var desc = card.querySelector('.project-desc') ? card.querySelector('.project-desc').textContent : '';

        var modal = createModal();
        var html = '';
        if(img && img.src){
          html += '<img src="'+img.src+'" alt="'+(img.alt||title)+'" style="width:100%;height:auto;border-radius:8px;margin-bottom:0.75rem;">';
        }
        html += '<h3 style="margin:0 0 0.5rem 0">'+title+'</h3>';
        html += '<p style="color:var(--muted);margin:0 0 0.75rem 0">'+desc+'</p>';
        modal.content.innerHTML = html;
      });
    })();

  });

})();
