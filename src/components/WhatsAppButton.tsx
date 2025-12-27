import { useState } from 'react';

export const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '+255688535848';
  const message = encodeURIComponent(
    "Hi DeMi Tours, I'm interested in learning more about your safari packages."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\+/g, '')}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 bottom-6 z-50 group"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulse Rings - More prominent */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-30" style={{ animationDelay: '0.5s' }} />

      {/* Main Button Container */}
      <div className="relative">
        {/* Button Circle with WhatsApp Colors */}
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isHovered ? 'scale-110 shadow-[#25D366]/50' : 'scale-100'
        }`}>
          {/* WhatsApp Icon (SVG for better quality) */}
          <svg
            viewBox="0 0 24 24"
            className="w-9 h-9 text-white"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>

          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-white text-xs font-bold">1</span>
          </div>
        </div>

        {/* Expandable Text on Hover */}
        <div className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0 visible' : 'opacity-0 translate-x-2 invisible'
        }`}>
          <div className="bg-white rounded-2xl shadow-2xl px-5 py-3 border-2 border-[#25D366]/20 relative">
            {/* Tooltip Arrow */}
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-[#25D366]/20 rotate-[-45deg]" />

            <div className="flex items-center gap-3 whitespace-nowrap">
              <div className="flex flex-col">
                <span className="font-heading font-bold text-foreground text-sm">Chat on WhatsApp</span>
                <span className="text-xs text-muted-foreground">We're online now!</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Label (always visible on mobile) */}
        <div className="md:hidden absolute -top-12 right-0 bg-[#25D366] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg whitespace-nowrap">
          Need help? Chat now!
          <div className="absolute top-full right-4 -translate-y-1/2 w-2 h-2 bg-[#25D366] rotate-45" />
        </div>
      </div>

      <style>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </a>
  );
};
