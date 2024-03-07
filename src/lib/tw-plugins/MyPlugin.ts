import plugin from "tailwindcss/plugin";

export const MyPlugin = plugin(
  ({ addBase, addUtilities }) => {
    addBase({
      ":root": {
        "--neutral": "39,39,42", //? zinc 800
        "--neutral-hover": "63,63,70", //? zinc 700
        "--neutral-revert": "228,228,231", //? zinc 200
        "--primary": "162,28,175", //? fuchsia 700
        "--alert": "200,50,50",
        "--success": "110,231,183", //? emerald 300,
        "--info": "8,145,178" //? cyan 600,
      },
    });
    addBase({

      body: {
        "@apply bg-gradient-to-tr from-neutral to-zinc-900 remove-scroll-bar text-neutral-revert": {},
        "font-feature-settings": '"rlig" 1, "calt" 1',

      },
      h1: { "@apply capitalize text-2xl": {} },
      h2: { "@apply capitalize text-xl": {} },
      h3: { "@apply capitalize text-lg": {} },
      h4: { "@apply capitalize text-base": {} },
      p: { "@apply text-sm": {} },
      li: { "@apply list-none": {} },
      a: { "@apply !text-current": {} },

    });
    addUtilities({
      ".remove-scroll-bar": {
        "scroll-behavior": "smooth",
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      },
      ".remove-scroll-bar::-webkit-scrollbar": {
        display: "none",
      },
      ".variant-success": {
        "@apply [--variant:110,231,183] dark:[--variant:50,171,123]": {},
      },
      ".variant-alert": {
        "@apply [--variant:200,0,0] dark:[--variant:200,0,0]": {},
      },
      ".variant-info": {
        "@apply [--variant:8,145,178] dark:[--variant:8,145,178]": {},
      },
    });
  },
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          neutral: "rgb(var(--neutral),<alpha-value>)",
          "neutral-revert": "rgb(var(--neutral-revert),<alpha-value>)",
          "neutral-hover": "rgb(var(--neutral-hover),<alpha-value>)",
          primary: "rgb(var(--primary),<alpha-value>)",
          variant: "rgb(var(--variant,0,0,0),<alpha-value>)",
          alert: "rgb(var(--alert),<alpha-value>)",
          success: "rgb(var(--success),<alpha-value>)",
        },
        screens: {
          mn: "420px",
          xs: "576px",
        },
        gridAutoColumns: {
          fluid: "repeat(auto-fit,minmax(0,1fr))",
        },
        gridAutoRows: {
          fluid: "repeat(auto-fit,minmax(0,1fr))",
        },
        animation: {
          fadein:
            "fadein var(--fadein-duration,0.3s) forwards  var(--fadein-delay,0s)",
          fadeout:
            "fadeout var(--fadeout-duration,0.3s) forwards var(--fadeout-delay,0s)",
          slideDown: "slideDown 0.3s forwards linear  ",
          slideUp: "slideUp 0.3s forwards linear  ",
        },
        keyframes: {
          fadein: {
            to: {
              opacity: "var(--fadein-opacity,1)",
              transform:
                "translate(var(--fade-translate-x,0) , var(--fade-translate-y,0)) rotate(var(--fade-rotate)) skewX(var(--fade-skew-x,0)) skewY(var(--fade-skew-y,0)) scaleX(var(--fade-scale-x,1)) scaleY(var(--fade-scale-y,1));",
            },
          },
          fadeout: {
            from: {
              opacity: "var(--fadeout-opacity,1)",
              transform:
                "translate(var(--fade-translate-x,0) , var(--fade-translate-y,0)) rotate(var(--fade-rotate)) skewX(var(--fade-skew-x,0)) skewY(var(--fade-skew-y,0)) scaleX(var(--fade-scale-x,1)) scaleY(var(--fade-scale-y,1));",
            },
          },
          slideDown: {
            from: {
              height: "0"
            },
            to: {
              height: "var(--radix-accordion-content-height)"
            }
          }
          , slideUp: {
            from: {
              height: "var(--radix-accordion-content-height)"
            },
            to: {
              height: "0"
            }
          }
        },
      },
    },
  });
export default MyPlugin;
