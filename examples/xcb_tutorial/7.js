// https://www.x.org/releases/current/doc/libxcb/tutorial/index.html#screen

// #include <stdio.h>
// 
// #include <xcb/xcb.h>
// 
// int
// main ()
// {
//   xcb_connection_t     *c;
//   xcb_screen_t         *screen;
//   int                   screen_nbr;
//   xcb_screen_iterator_t iter;
// 
//   /* Open the connection to the X server. Use the DISPLAY environment variable */
//   c = xcb_connect (NULL, &screen_nbr);
// 
//   /* Get the screen #screen_nbr */
//   iter = xcb_setup_roots_iterator (xcb_get_setup (c));
//   for (; iter.rem; --screen_nbr, xcb_screen_next (&iter))
//     if (screen_nbr == 0) {
//       screen = iter.data;
//       break;
//     }
// 
//   printf ("\n");
//   printf ("Informations of screen %ld:\n", screen->root);
//   printf ("  width.........: %d\n", screen->width_in_pixels);
//   printf ("  height........: %d\n", screen->height_in_pixels);
//   printf ("  white pixel...: %ld\n", screen->white_pixel);
//   printf ("  black pixel...: %ld\n", screen->black_pixel);
//   printf ("\n");
// 
//   return 0;
// }

"use strict";

const ref = require("ref");
const xcb = require("../../xcb.js");

const main = async () => {
  /* Open the connection to the X server. Use the DISPLAY environment variable */
  const screen_nbr_ref = ref.alloc(ref.types.int);
  const c = await xcb.connect (null, screen_nbr_ref);
  let screen_nbr = screen_nbr_ref.deref();

  /* Get the screen #screen_nbr */
  let screen;
  const iter = await xcb.setup_roots_iterator (await xcb.get_setup (c));
  for (; iter.rem; --screen_nbr, await xcb.screen_next (ref.refType(iter)))
    if (screen_nbr === 0) {
      screen = iter.data;
      break;
    }

  console.log("");
  console.log(`Informations of screen ${ screen.deref().root }:`);
  console.log(`  width.........: ${ screen.deref().width_in_pixels }`);
  console.log(`  height........: ${ screen.deref().height_in_pixels }`);
  console.log(`  white pixel...: ${ screen.deref().white_pixel }`);
  console.log(`  black pixel...: ${ screen.deref().black_pixel }`);
  console.log("");
};

main();
