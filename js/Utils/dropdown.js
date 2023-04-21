export function foldDropdown (elementMenu) {
    for (let i = 0; i < elementMenu.length; i++) {
      elementMenu[i].classList.remove('active')
    }
  }
  
  export function unfoldAndFoldDropdown (li, e, list) {
    if (li.classList.contains('active') && (li.firstChild === e.target)) {
      li.classList.remove('active')
    } else {
      list.forEach(toggle => { toggle.classList.remove('active') })
      li.classList.add('active')
    }
  }
  