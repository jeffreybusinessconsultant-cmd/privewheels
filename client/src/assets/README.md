# Assets Folder

This folder contains static assets for the Prive Wheels website.

## Structure

- **images/** - Store all image files (logos, car photos, backgrounds, etc.)
- **icons/** - Store icon files (SVG, PNG icons)

## Usage

Import assets in your components:

```typescript
import logo from '@/assets/images/logo.png';
import carIcon from '@/assets/icons/car.svg';
```

## Supported Formats

- Images: .jpg, .jpeg, .png, .gif, .webp, .svg
- Icons: .svg, .png

## Best Practices

1. Use descriptive file names (e.g., `prive-wheels-logo.png` instead of `logo1.png`)
2. Optimize images before adding them to reduce file size
3. Use WebP format for better performance when possible
4. Keep SVG files for icons when possible for scalability
5. Organize files in subdirectories if needed (e.g., `images/cars/`, `images/backgrounds/`)
