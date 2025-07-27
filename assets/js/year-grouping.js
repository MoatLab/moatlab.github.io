document.addEventListener('DOMContentLoaded', function() {
  // Get all publication entries
  const publicationEntries = document.querySelectorAll('.publication-entry');
  
  if (publicationEntries.length === 0) {
    return;
  }
  
  let lastYear = null;
  
  publicationEntries.forEach((entry, index) => {
    const yearBlock = entry.querySelector('.year-block');
    const year = entry.getAttribute('data-year');
    
    if (yearBlock && year) {
      // Show year block only if this is the first publication of this year
      if (year !== lastYear) {
        yearBlock.style.display = 'block';
        yearBlock.style.borderBottom = '2px solid #e5e7eb !important';
        yearBlock.style.paddingBottom = '12px';
        yearBlock.style.marginBottom = '16px';
        lastYear = year;
      } else {
        yearBlock.style.display = 'none';
      }
    }
  });
}); 