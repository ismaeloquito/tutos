toastr.options.progressBar = true;

const url = "https://ismael-ochoa.com/files/visor/pdf/BoletinIEsapiens.pdf";


/*const url = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";*/



const pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
"//mozilla.github.io/pdf.js/build/pdf.worker.js";

let loggedIn = false,
pdfDoc = null,
pageNum = 1,
pageRendering = false,
pageNumPending = null,
scale = 1,
canvas = document.getElementById("pdfviewer"),
ctx = canvas.getContext("2d");

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function (page) {
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport };

    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function () {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  // Update page counters
  document.getElementById("currentPage").textContent = num;
}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

/**
 * Asynchronously downloads PDF.
 */
pdfjsLib.getDocument(url).promise.then(function (pdfDoc_) {
  pdfDoc = pdfDoc_;
  document.getElementById("totalPages").textContent = pdfDoc.numPages;

  // Initial/first page rendering
  renderPage(pageNum || 1);
});

function onPrevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}
document.getElementById("prev").addEventListener("click", onPrevPage);

function onNextPage() {

    if (pageNum >= pdfDoc.numPages) {
      return;
    }
    pageNum++;
    queueRenderPage(pageNum);  
}
document.getElementById("next").addEventListener("click", onNextPage);


document.getElementById("download").addEventListener("click", e => {
  if (loggedIn) {
    toastr.success('You can download the Document', 'Ok!');
  } else {
    toastr.error("You Must be Logged in to Download this Document", "Sorry");
  }
});


const loggedInClass = "bg-green-500";
const loggedOutClass = "bg-red-500";
$(".nav").prepend($("<a>", { href: "#" }).
text("Logged In").
addClass("border py-2 px-4 rounded " + (loggedIn ? loggedInClass : loggedOutClass)).
on("click", function (e) {
  e.preventDefault();
  if (loggedIn) {
    $(this).removeClass(loggedInClass).addClass(loggedOutClass);
    loggedIn = false;
  } else {
    $(this).removeClass(loggedOutClass).addClass(loggedInClass);
    loggedIn = true;
  }
}));