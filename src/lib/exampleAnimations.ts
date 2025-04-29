export const exampleAnimations = {
  basicCircle: `
return anime({
  targets: container,
  innerHTML: '<div class="w-16 h-16 bg-blue-500 rounded-full"></div>',
  scale: [0, 1],
  rotate: '1turn',
  duration: 2000,
  easing: 'easeInOutQuad'
});`,

  bouncingBalls: `
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
const balls = colors.map((color, i) => 
  \`<div class="w-8 h-8 rounded-full" style="background-color: \${color}; position: absolute; left: \${i * 20}%; top: 50%;"></div>\`
).join('');
container.innerHTML = balls;

return anime({
  targets: container.children,
  translateY: [-100, 0],
  delay: anime.stagger(100),
  duration: 1000,
  loop: true,
  direction: 'alternate',
  easing: 'easeInOutQuad'
});`,

  textReveal: `
container.innerHTML = '<div class="text-4xl font-bold text-center">Hello World</div>';
const text = container.querySelector('div');

return anime({
  targets: text,
  opacity: [0, 1],
  translateY: [20, 0],
  duration: 1500,
  easing: 'easeOutElastic(1, .5)'
});`
}; 