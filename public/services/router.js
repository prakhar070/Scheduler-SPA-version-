import parseRequestURL from "./utils.js"
import About from "../pages/about.js"
import Register from "../pages/register.js"
import Login from "../pages/login.js"
import Interviews from "../pages/interviews.js"
import Interview from "../pages/interview.js"
import Navbar from "../components/navbar.js"

//these are the routes defined for our application 
const routes = {
    '/about'      : About,
    '/register'   : Register,
    '/interviews' : Interviews,
    '/interviews/:id' : Interview,
    '/login'      : Login
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');

    // Get the parsed URl from the addressbar
    let request = parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    console.log("parsedURL is ", parsedURL)

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();

    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);