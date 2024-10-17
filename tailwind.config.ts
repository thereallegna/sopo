import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			Neutral: {
  				'50': '#f9fafb',
  				'100': '#f2f4f7',
  				'200': '#e4e7ec',
  				'300': '#d0d5dd',
  				'400': '#98a2b3',
  				'500': '#667085',
  				'600': '#475467',
  				'700': '#344054',
  				'800': '#1d2939',
  				'900': '#101828',
  				White: '#ffffff',
  				Black: '#000000'
  			},
  			Blue: {
  				'50': '#ebf1f8',
  				'100': '#d6e3f1',
  				'200': '#adc7e3',
  				'300': '#85abd6',
  				'400': '#5c8fc8',
  				'500': '#3373ba',
  				'600': '#2e68a8',
  				'700': '#2b629e',
  				'800': '#295c95',
  				'900': '#26568b'
  			},
  			Green: {
  				'50': '#ecfdf3',
  				'100': '#d1fadf',
  				'200': '#a6f4c5',
  				'300': '#6ce9a6',
  				'400': '#32d583',
  				'500': '#12b76a',
  				'600': '#039855',
  				'700': '#027a48',
  				'800': '#05603a',
  				'900': '#054f31'
  			},
  			Red: {
  				'50': '#fef3f2',
  				'100': '#fee4e2',
  				'200': '#fecdca',
  				'300': '#fda29b',
  				'400': '#f97066',
  				'500': '#f04438',
  				'600': '#d92d20',
  				'700': '#b42318',
  				'800': '#912018',
  				'900': '#7a271a'
  			},
  			Orange: {
  				'50': '#fff0d8',
  				'100': '#ffe9c5',
  				'200': '#ffdb9e',
  				'300': '#ffd38b',
  				'400': '#ffc564',
  				'500': '#f4a118',
  				'600': '#e49614',
  				'700': '#b6760e',
  				'900': '#3b2604'
  			},
  			Purple: {
  				'50': '#f9e9ff',
  				'100': '#efc3ff',
  				'200': '#e59cff',
  				'300': '#db76ff',
  				'400': '#d14fff',
  				'500': '#c127f7',
  				'600': '#9d10ce',
  				'700': '#7b00a5',
  				'800': '#5c007c',
  				'900': '#3e0054'
  			},
  			Tosca: {
  				'50': '#dafbff',
  				'200': '#9cf7ff',
  				'600': '#30c0cc',
  				'700': '#117f88'
  			},
  			Yellow: {
  				'50': '#ffeec0',
  				'200': '#ffd86a',
  				'600': '#fecc3f',
  				'700': '#98740f'
  			}
  		},
  		fontSize: {
  			xs: '0.625rem',
  			sm: '0.75rem',
  			base: '0.875rem',
  			lg: '1rem',
  			xl: '1.25rem',
  			'2xl': '1.5rem',
  			'3xl': '2rem'
  		},
  		fontFamily: {
  			'plus-jakarta-sans': 'Plus Jakarta Sans'
  		},
  		boxShadow: {
  			'Shadow/s': '0px 1px 3px 0px rgba(0,0,0,0.07)',
  			'Shadow/md': '0px 2px 4px -2px rgba(16,24,40,0.06), 0px 4px 8px -2px rgba(16,24,40,0.1)',
  			'Shadow/lg': '0px 4px 6px -2px rgba(16,24,40,0.03), 0px 12px 16px -4px rgba(16,24,40,0.08)',
  			'Shadow/xl': '0px 4px 20px 5px rgba(0,0,0,0.1)'
  		},
  		borderRadius: {
  			'rounded-0': '0px',
			'rounded-1': '6px',
			'rounded-2': '8px',
			'rounded-3': '10px',
			'rounded-4': '12px',
			'rounded-5': '14px',
			'rounded-6': '16px',
			'rounded-7': '18px',
			'rounded-8': '20px',
			'rounded-9': '24px',
			'rounded-10': '28px',
			'rounded-11': '32px',
			'rounded-12': '40px',
			'rounded-13': '48px',
			'rounded-14': '56px',
			'rounded-15': '64px',
			'rounded-16': '72px',
			'rounded-17': '112px',
			lg: '16px',
			md: '12px',
			sm: '6px', 
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
