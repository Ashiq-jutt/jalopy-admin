module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      }, 
      backgroundColor:{ 
        main:"#A25EDF", 
        "main-hover":"#F1E9FE",
      } , 
      boxShadow:{ 
        custom:"0px 4px 4px 0px #00000040", 
        topproducts:"1px 4px 4px 0px #00000040",  
           transactions:"0px 2px 6px 0px #00000040", 
           paymentMethod:"1px 1px 4px 0px #022859"
      },
      colors:{ 
        "warning":"#EF004C",
        "yellow":"rgba(227, 211, 8, 1)", 
        "admin-percent":"#4CAF50",
        "admin-color":"#F1E9FE", 
        "main-color":"#A25EDF",
        "admin-color-hover":"#A25EDF"
      },
      fontFamily: {
        'poppins': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("postcss-nesting"),

    // ...
  ],
};
