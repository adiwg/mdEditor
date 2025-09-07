// app/font-awesome.ts
import { library, config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // This adds the basic icon styles into your app
import * as freeSolidIcons from '@fortawesome/free-solid-svg-icons';

// Disable auto CSS import into head. It solved the side effect for jumping icon size.
// This is required for Fastboot apps, otherwise build fails
// It's the recommended way for setup Font Awesome in your app
config.autoAddCss = false;

// option to import all icons from solid pack.
// If you want to import only a subset of icons from pack, see section "Subsetting icons"
library.add(freeSolidIcons['fas']);
