// src/js/test.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c✅ JS test.js đã hoạt động!', 'color: green; font-size: 16px');

  const testDiv = document.createElement('div');
  testDiv.innerText = '✅ JavaScript đã hoạt động!';
  testDiv.style.position = 'fixed';
  testDiv.style.bottom = '10px';
  testDiv.style.right = '10px';
  testDiv.style.background = '#4caf50';
  testDiv.style.color = 'white';
  testDiv.style.padding = '10px 15px';
  testDiv.style.borderRadius = '8px';
  testDiv.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  testDiv.style.zIndex = '9999';
  document.body.appendChild(testDiv);
});
