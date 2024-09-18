export const Engine = new Proxy({
    
}, {
    get: function(target, prop) {
      // Check if the function exists on the p5 object
      console.log(target);
      if (typeof p5[prop] === 'function') {
        // Return the p5 function
        return p5[prop].bind(p5); // bind to p5 context to ensure it works properly
      }

      return target[prop];
    }
});