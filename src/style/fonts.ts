import FontFaceObserver from "fontfaceobserver";

/**
 * When konva draw the timetable using a font that is not used elsewhere, the font has to be loaded first,
 * but konva draws faster, causing the font to be drawn using fallback font family.
 * 
 * To solve this, we have to load the font on the page start.
 */


// Poppins (App, UTM, Legacy)
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

// Rajdhani (Purple Galaxy)
import "@fontsource/rajdhani/500.css";

// Grandstander (Cute)
import "@fontsource/grandstander/300.css";

// Marvel (Spidey)
import "@fontsource/marvel/400.css";

// Cantora One (Forest)
import "@fontsource/cantora-one/400.css";



function loadFont(fontFamily: string) {
    new FontFaceObserver(fontFamily).load().then(()=> {}, ()=> {
        console.error(`Font ${fontFamily} failed to load`);
    });
}

loadFont("Poppins");
loadFont("Rajdhani");
loadFont("Grandstander");
loadFont("Marvel");
loadFont("Cantora One");

