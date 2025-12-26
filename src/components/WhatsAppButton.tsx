import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
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
      className="fixed left-6 bottom-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse Ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-20 delay-500" />
      
      {/* Button */}
      <div className="relative flex items-center">
        {/* Icon Circle */}
        <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <MessageCircle className="w-7 h-7 text-primary-foreground fill-primary-foreground" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-4 py-2 bg-background text-foreground rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 whitespace-nowrap">
          <span className="font-heading text-sm font-medium">Chat with us</span>
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-background rotate-45" />
        </div>
      </div>
    </a>
  );
};
