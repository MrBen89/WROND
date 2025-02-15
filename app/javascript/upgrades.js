document.addEventListener('DOMContentLoaded', function() {
  const upgrades = document.querySelectorAll('.upgrade.selectable');

  upgrades.forEach(upgrade => {
    upgrade.addEventListener('click', function() {
      // Removes the 'selected' class from all upgrades  and add it to the clicked upgrade
      upgrades.forEach(up => {
        up.classList.remove('selected');
        up.style.backgroundColor = '';
      });

      this.classList.add('selected');

      // Changes the background color to the corresponding color
      const color = this.getAttribute('data-color');
      this.style.backgroundColor = color;
    });
  });
});
