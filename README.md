# Markdown Animation Editor

A Next.js application that allows you to paste markdown content and add animated sections below each heading using anime.js.

## Features

- Paste markdown content with headings
- Automatic detection of headings (h1-h6)
- Add animations below each heading section
- Pre-built animation templates
- Custom animation support using anime.js
- Live preview of animations

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

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