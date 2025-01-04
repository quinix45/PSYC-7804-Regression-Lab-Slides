// Add separator under title

    // SVG content as a string
    const svgContent = `<svg class="title-separator" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  height="41px" viewBox="-0.5 -0.5 923 41" content="&lt;mxfile&gt;&lt;diagram id=&quot;2TYFnY0_VJDJ40RJej4Q&quot; name=&quot;Page-1&quot;&gt;zZXfb5swEMf/Gl4rfgSiPbZZuj1sUqVM2rODr2DVcMhcCNlfv3NsIIR03SpN6hP2h7uz73t3ECSbqv9iRFN+Rwk6iEPZB8nnII7jMM74YcnJkXWWOlAYJR2KJrBTv8DD0NODktDODAlRk2rmMMe6hpxmTBiDx7nZM+r5qY0oYAF2udBL+lNJKh1dheHEv4IqSn/y2vNKDKYetKWQeLxAyTZINgaR3KrqN6CtdIMqzu/xlbfjtQzU9DcOiXPohD74zPy96DSkCrW8t4rxrsaa4UNJleZdxMuWDL6MEiSWlKKxnlrVL27rEgx5A3p/XndgSLGYjNxxIBdyTxlEoy7cToAVkDmxyXHSPfVqlheSD8yAFqS6eXjhy1+M4cYTnlDxwXHoWzVb+Ti+UVdpOg/R4sHk4L0ulb4KFIXZG5FImAJoEYkXF3lP6FzJ21VN367qUIJvYg/6CVtFCmt+tUcirLgwQqvCgpzrAGZe9cH53tsQNkwbe3Mw2449Wm8pRVuC9OUfWqPqC/tVuGuUjPmOHbR354eNbJ8/TmezvbAJPkh43pEgS3KNLUdzyfEdoP/XpvEO6fqqFomX7KKpshtNNTTDrf6Z1esPxfn0v0fuo49UtBip1ftGKl1M1FWgd08Ub6dvsDOf/mPJ9jc=&lt;/diagram&gt;&lt;/mxfile&gt;">
        <defs/>
        <g>
          <path d="M 501 17 L 981 17 M 981 23 L 501 23 M 921 23" fill="none"  stroke-width="3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"/>
          <ellipse cx="461" cy="20" rx="12." ry="12.8" fill="rgb(255, 255, 255)"  pointer-events="all"/>
          <path d="M 431 0 L 461 20 L 431 40 Z M 491 0 L 461 20 L 491 40 Z"  stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"/>
          <ellipse cx="461" cy="20" rx="12" ry="12.8" fill="rgb(255, 255, 255)"  pointer-events="all"/>
          <path d="M -60 16 L 421 16 M 421 22 L -60 22 M 421 22" fill="none"  stroke-width="3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"/>
        </g>
      </svg>`;

document.addEventListener('DOMContentLoaded', function() {
  appendSVGToTitleElements();
  function appendSVGToTitleElements() {
    // Select all elements with the class "title"
    const titleElements = document.querySelectorAll('.title');
      
    // Iterate through each element
    titleElements.forEach(function(element) {
      // Create a new div element to contain the SVG
      const svgWrapper = document.createElement('div');
      svgWrapper.innerHTML = svgContent;
  
      // Append the SVG to the title element
      element.appendChild(svgWrapper.firstChild);
    });
  } 
});

// first line controls size (left plygon in title)
const decorationMarkup1 = `<svg id="mySVG" style="transform: scaleX(3.5) scaleY(3.5); transform-origin: 0 0;">
<polygon points="129.9038105676658, 74.99999999999999 39.184850993605149,150 -129.90381056766577,1005.00000000000006 -129.90381056766583,-74.99999999999996 -2.7554552980815446e-14,-150 129.90381056766583,-74.99999999999994"  class="decoration" style="stroke-width:2;"/>
</svg>`;

document.addEventListener('DOMContentLoaded', function() {
  appendSVGToTitleElements();
  function appendSVGToTitleElements() {
    // Select all elements with the class "title"
    const titleElements = document.querySelectorAll('.quarto-title-block');
      
    // Iterate through each element
    titleElements.forEach(function(element) {
      // Create a new div element to contain the SVG
      const svgWrapper1 = document.createElement('div');
      svgWrapper1.innerHTML = decorationMarkup1;


      svgWrapper1.style.position = 'fixed';
      svgWrapper1.style.top = '-37%';  // Adjust as needed
      svgWrapper1.style.left = '-27%'; // Adjust as needed
      svgWrapper1.style.width = '0px'; // Full width of the parent
      svgWrapper1.style.height = '0px'; // Full height of the parent
      svgWrapper1.style.pointerEvents = 'none'; // So it doesn't block interactions
      svgWrapper1.style.zIndex = '10'; // Ensure it's above other content
      svgWrapper1.style.backgroundColor = "red";
      svgWrapper1.id = "SVGwrapper1";
  
      // Append the SVG to the title element
      element.append(svgWrapper1);
    });
  } 
});




// first line controls size (right plygon in title)
const decorationMarkup2 = `<svg id="mySVG" style="transform: scaleX(-3.5) scaleY(3.5); transform-origin: 0 0;">
<polygon points="129.9038105676658, 74.99999999999999 39.184850993605149,150 -129.90381056766577,1005.00000000000006 -129.90381056766583,-74.99999999999996 -2.7554552980815446e-14,-150 129.90381056766583,-74.99999999999994"  class="decoration" style="stroke-width:2;"/>
</svg>`;


document.addEventListener('DOMContentLoaded', function() {
  appendSVGToTitleElements();
  function appendSVGToTitleElements() {
    // Select all elements with the class "title"
    const titleElements = document.querySelectorAll('.quarto-title-block');
      
    // Iterate through each element
    titleElements.forEach(function(element) {
      // Create a new div element to contain the SVG
      const svgWrapper2 = document.createElement('div');
      svgWrapper2.innerHTML = decorationMarkup2;


      svgWrapper2.style.position = 'absolute';
      svgWrapper2.style.top = '-37%';  // Adjust as needed
      svgWrapper2.style.left = '127%'; // Adjust as needed
      svgWrapper2.style.width = '0%'; // Full width of the parent
      svgWrapper2.style.height = '0'; // Full height of the parent
      svgWrapper2.style.pointerEvents = 'none'; // So it doesn't block interactions
      svgWrapper2.style.zIndex = '10'; // Ensure it's above other content
  
      // Append the SVG to the title element
      element.append(svgWrapper2);
    });
  } 
});





function onClassChange(element, callback) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        callback(mutation.target);
      }
    });
  });
  observer.observe(element, { attributes: true });
  return observer.disconnect;
}





document.addEventListener('DOMContentLoaded', function() {
  // Function to automatically apply the .image classes to all <img> elements
  function applyImageClass() {
      const images = document.querySelectorAll('div img');
      images.forEach(img => {
          img.classList.add('image');
          //img.classList.add('draggable');
      });
  }

  // Call the function to apply the class
  applyImageClass();

  let currentImage = null;
  let contextMenu = null;

  // List of zoom classes
  const zoomClasses = [
      'zoom1xJS-active', 'zoom1_25xJS-active', 'zoom1_5xJS-active', 
      'zoom1_75xJS-active', 'zoom2xJS-active', 'zoom2_5xJS-active', 
      'zoom3xJS-active', 'zoom4xJS-active', 'zoom6xJS-active', 
      'zoom8xJS-active'
  ];

  // Function to create the context menu
  function createContextMenu() {
      contextMenu = document.createElement('div');
      contextMenu.id = 'contextMenu';
      contextMenu.className = 'custom-menu';

      // Reset button added for tablet/mobile users convenience

      contextMenu.innerHTML = `
          <a href="#" data-class="zoom1xJS-active"> 🔍 1x</a>
          <a href="#" data-class="zoom1_25xJS-active"> 🔍 1.25x</a>
          <a href="#" data-class="zoom1_5xJS-active"> 🔍 1.5x</a>
          <a href="#" data-class="zoom1_75xJS-active"> 🔍 1.75x</a>
          <a href="#" data-class="zoom2xJS-active"> 🔍 2x</a>
          <a href="#" data-class="zoom2_5xJS-active"> 🔍 2.5x</a>
          <a href="#" data-class="zoom3xJS-active"> 🔍 3x</a>
          <a href="#" data-class="zoom4xJS-active"> 🔍 4x</a>
          <a href="#" data-class="zoom6xJS-active"> 🔍 6x</a>
          <a href="#" data-class="zoom8xJS-active"> 🔍 8x</a>
          <a href="#" data-class="unzoom">🔍 Reset</a>
      `;
      document.body.appendChild(contextMenu);

      // Add event listeners to menu items
      contextMenu.querySelectorAll('a').forEach(menuItem => {
          menuItem.addEventListener('click', function(e) {
              e.preventDefault();
              if (currentImage) {
                  // Remove all previously applied classes
                  contextMenu.querySelectorAll('a').forEach(item => {
                      const className = item.getAttribute('data-class');
                      currentImage.classList.remove(className);
                  });

                  // Apply the new class
                  const newClassName = menuItem.getAttribute('data-class');
                  if (newClassName) {

                      currentImage.classList.add(newClassName)
                  
                    // var parent = currentImage.parentElement
                    // currentImage.remove()
                    // var overlay = document.createElement('div');
                    // currentImage.append(over)
                    // overlay.classList.add("dim");
                    // parent.append(overlay)
                    // overlay.append(currentImage)
                  }

                  // Hide the context menu
                  contextMenu.style.display = 'none';
              }
          });
      });
  }

  // Function to check if any zoom class is applied
  function hasZoomClass(img) {
      return zoomClasses.some(zoomClass => img.classList.contains(zoomClass));
  }

  // Event listener for image clicks
  document.querySelectorAll('.image').forEach(img => {
      img.addEventListener('click', function(e) {
          e.preventDefault();
          currentImage = e.target;

          if (!contextMenu) {
              createContextMenu();
          }

          contextMenu.style.display = 'block';
          contextMenu.style.left = `${e.pageX}px`;
          contextMenu.style.top = `${e.pageY}px`;
      });

      // Event listener for right-click (context menu) to handle zoom class removal
      img.addEventListener('contextmenu', function(e) {
          if (hasZoomClass(img)) {
              e.preventDefault(); // Prevent the default context menu if zoom classes are present
              zoomClasses.forEach(zoomClass => {
                  img.classList.remove(zoomClass);
              });
          }
      });
  });

  // Hide the context menu when clicking outside
  document.addEventListener('click', function(e) {
      if (contextMenu && !contextMenu.contains(e.target) && e.target !== currentImage) {
          contextMenu.style.display = 'none';
      }
  });
});





// drag on hold

document.addEventListener('DOMContentLoaded', function() {
  let selectedElement = null;
  let offsetX = 0;
  let offsetY = 0;

  // Prevent default image dragging behavior
  document.querySelectorAll('.draggable').forEach((element) => {
      element.setAttribute('draggable', 'false'); // Disable default drag behavior
  });

  // Mouse down event handler
  function onMouseDown(e) {
      if (e.button === 0 && e.target.classList.contains('draggable')) { // Ensure it's the left mouse button
          selectedElement = e.target;

          // Calculate the offset to center the cursor on the image
          const rect = selectedElement.getBoundingClientRect();
          offsetX = e.clientX - (rect.left + rect.width / 14);
          offsetY = e.clientY - (rect.top + rect.height / 14);

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
      }
  }

  // Mouse move event handler
  function onMouseMove(e) {
      if (selectedElement) {
          // Calculate new position based on cursor position and offsets
          const x = e.clientX - offsetX;
          const y = e.clientY - offsetY;
          selectedElement.style.left = `${x}px`;
          selectedElement.style.top = `${y}px`;
      }
  }

  // Mouse up event handler
  function onMouseUp() {
      selectedElement = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
  }

  // Prevent the default dragstart behavior
  document.addEventListener('dragstart', function(e) {
      if (e.target.classList.contains('draggable')) {
          e.preventDefault();
      }
  });

  // Add mousedown event listener to the document
  document.addEventListener('mousedown', onMouseDown);
  
  // Prevent dragging when the mouse button is not held down
  document.addEventListener('mouseup', function() {
      selectedElement = null;
  });
});






// hide slide Number


Reveal.addEventListener('slidechanged', (event) => {
        const isSnOn = (event.currentSlide.dataset.hideSlideNumber !== 'true');
            Reveal.configure({ slideNumber: isSnOn });
          });
