import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '5491162822541',
  message = 'Hola, quisiera más información sobre AiMapping.',
}) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on Hover */}
      <span className="hidden md:block absolute right-16 px-3.5 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-semibold tracking-wide whitespace-nowrap shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
        ¿Hablamos por WhatsApp?
      </span>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/40 hover:shadow-xl hover:shadow-[#25D366]/60 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Subtle Ambient Ping Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none -z-10" />

        {/* WhatsApp Official SVG Icon */}
        <svg
          className="w-7 h-7 fill-current drop-shadow-sm"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.677.15-.201.301-.778.979-.953 1.179-.175.2-.351.226-.652.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.501.101-.2.05-.376-.025-.526s-.677-1.632-.928-2.235c-.244-.588-.493-.508-.677-.517-.175-.008-.376-.01-.577-.01s-.527.075-.802.376c-.276.301-1.053 1.028-1.053 2.508s1.079 2.909 1.229 3.109c.15.2 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.723.23 1.381.197 1.901.12.579-.087 1.78-.728 2.031-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.351zM12.04 2C6.516 2 2.028 6.488 2.028 12.012c0 1.954.561 3.78 1.536 5.337L2 22l4.825-1.527a9.96 9.96 0 0 0 5.215 1.463c5.524 0 10.012-4.488 10.012-10.012C22.052 6.488 17.564 2 12.04 2zm0 18.256c-1.668 0-3.219-.475-4.542-1.298l-.326-.2-3.327 1.053 1.076-3.242-.213-.339a8.214 8.214 0 0 1-1.261-4.418c0-4.557 3.708-8.265 8.265-8.265 4.557 0 8.265 3.708 8.265 8.265 0 4.557-3.708 8.264-8.265 8.264z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
