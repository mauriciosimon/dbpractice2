# Markdown Animation Editor

A Next.js 14 application for editing and visualizing markdown with animated sections using anime.js.

## Features

- Firebase Authentication (Google)
- Markdown editing and live preview
- Modern, responsive UI with Tailwind CSS
- Smooth UI animations with anime.js
- Auth logic separated from UI rendering for best performance and maintainability

## Project Structure

- All code is in `/src`
- `/src/app` contains main pages and layouts
- `/src/app/components` contains all React components
- `/src/app/lib` contains helpers, hooks, and contexts

## Setup

1. Clone the repository  
   `git clone https://github.com/mauriciosimon/dbpractice2.git`
2. Install dependencies  
   `npm install`
3. Run the development server  
   `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal)

## Best Practices

- All UI uses Tailwind CSS for styling and layout.
- Main content is centered using Flexbox/Grid.
- Animations are handled with anime.js and only triggered after Firebase auth state is ready.
- Authentication logic is separated from UI rendering.
- Follow the `.cursorrules` file for all code and UI contributions.

## Troubleshooting

- If Tailwind styles do not load, check `tailwind.config.js` and global CSS imports.
- If UI is not centered, verify parent containers use flex/grid and correct alignment classes.
- For webpack or Next.js errors, try deleting `.next` and `node_modules`, then reinstall dependencies.

## References

- [.cursorrules best practices](https://github.com/PatrickJS/awesome-cursorrules)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js 14 Docs](https://nextjs.org/docs)
- [anime.js Docs](https://animejs.com/documentation/)

---

## How to Use

1. Paste your markdown content in the text area
2. The content will be automatically parsed and displayed with sections
3. Click on any empty animation container below a heading
4. Choose a template or paste your own anime.js animation code
5. Click "Save Animation" to apply the animation

## Animation Templates

The application comes with three example animation templates:

1. **basicCircle**: A simple circle that scales and rotates
2. **bouncingBalls**: Multiple colored balls that bounce up and down
3. **textReveal**: Text that fades in with an elastic effect

## Creating Custom Animations

You can create custom animations using anime.js. The animation code should be a function that returns an anime.js animation instance. The function receives two parameters:

- `anime`: The anime.js library
- `container`: The DOM element where the animation will be rendered

Example:
```javascript
return anime({
  targets: container,
  innerHTML: '<div class="w-16 h-16 bg-blue-500 rounded-full"></div>',
  scale: [0, 1],
  rotate: '1turn',
  duration: 2000,
  easing: 'easeInOutQuad'
});
```

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- anime.js
- react-markdown