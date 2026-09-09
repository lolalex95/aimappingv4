import { Header } from './components/layout/Header';
import { HeroSection } from './components/sections/HeroSection';
import { PuntoPartidaVariant } from './components/sections/PuntoPartidaVariant';
import { ComoFuncionaVariant } from './components/sections/ComoFuncionaVariant';
import { DemostracionVariant } from './components/sections/DemostracionVariant';
import { QueRecibes } from './components/sections/QueRecibes';
import { BeneficiosVariant } from './components/sections/BeneficiosVariant';
import { ResultadosMedibles } from './components/sections/ResultadosMedibles';
import { CtaBanner } from './components/sections/CtaBanner';
import { Sectores } from './components/sections/Sectores';
import { FaqSection } from './components/sections/FaqSection';
import { Formulario } from './components/sections/Formulario';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { useScrollObserver } from './hooks/useScrollObserver';
import { LanguageProvider } from './context/LanguageContext';

export function App() {
  useScrollObserver();

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#4F5051]">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <PuntoPartidaVariant />
          <ComoFuncionaVariant />
          <DemostracionVariant />
          <QueRecibes />
          <BeneficiosVariant />
          <ResultadosMedibles />
          <CtaBanner />
          <Sectores />
          <FaqSection />
          <Formulario />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
}

export default App;
