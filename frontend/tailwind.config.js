export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        mpesaRed: "#E60000",
        mpesaGreen: "#00A818",
        mpesaWhite: "#FFFFFF",
        mpesaGray: "#4A4A4A",
        mpesaLight: "#F6F6F6",
        mpesaDarkGray: "#333333",
        mpesaYellow: "#F59E0B",
        mpesaError: "#DC2626"
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2s infinite',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up-delay-1': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
        'slide-up-delay-2': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
        'slide-up-delay-3': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(230, 0, 0, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(230, 0, 0, 0.3)' },
        },
      }
    }
  },
  plugins: []
};
