
      function relojito(entries) {
        const objetoEnPantalla = entries[0].isIntersecting
        if (objetoEnPantalla) {
          console.log("probando relojito")
          $('.chart').easyPieChart({
            size: 100,
            barColor: "#53B596 ",
            scaleLength: 0,
            lineWidth: 15,
            trackColor: "#e9ecef",
            lineCap: "circle",
            animate: 5000,
          });
        }
      }

      let options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      }
      let observer = new IntersectionObserver(relojito, options);
      const skills = document.getElementById("relojitos")
      observer.observe(skills)

      
