function selectTextInEl(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
  
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
  
  function copyText(text) {
    const el = document.createElement('span');
    el.style.position = 'fixed';
    el.style.top = -9999;
    el.innerText = text;
  
    document.body.appendChild(el);
  
    selectTextInEl(el);
  
    if (document.queryCommandSupported('copy')) {
      document.execCommand('copy');
    }
  
    el.remove();
  }
  
  function copyPlainText(data) {
    const copyTextArea = document.createElement('textarea');
  
    copyTextArea.style.position = 'fixed';
    copyTextArea.style.top = -9999;
    copyTextArea.value = data;
  
    document.body.appendChild(copyTextArea);
    copyTextArea.select();
  
    document.execCommand('copy');
  
    document.body.removeChild(copyTextArea);
  }
  
 export {copyText, copyPlainText}