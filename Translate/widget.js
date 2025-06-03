function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: '',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');

  setTimeout(() => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.style.width = 'auto';
      select.style.minWidth = '140px';
    }
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.translate-widget-container');
  const widget = document.getElementById('translateWidget');
  const handle = document.querySelector('.drag-handle');
  
  let isDragging = false;
  let offsetX, offsetY;

  // Load saved position
  const savedPos = localStorage.getItem('translateWidgetPos');
  if (savedPos) {
    const pos = JSON.parse(savedPos);
    container.style.left = pos.left;
    container.style.top = pos.top;
    container.style.right = 'auto';
  }

  // Make draggable
  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - container.getBoundingClientRect().left;
    offsetY = e.clientY - container.getBoundingClientRect().top;
    widget.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    
    container.style.left = `${Math.max(0, Math.min(x, window.innerWidth - container.offsetWidth))}px`;
    container.style.top = `${Math.max(0, Math.min(y, window.innerHeight - container.offsetHeight))}px`;
    container.style.right = 'auto';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    widget.style.cursor = '';
    localStorage.setItem('translateWidgetPos', JSON.stringify({
      left: container.style.left,
      top: container.style.top
    }));
  });

  // Load Google Translate
  const script = document.createElement('script');
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(script);
});