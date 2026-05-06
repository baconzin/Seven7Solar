
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Sun, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Menu, 
  X, 
  Home, 
  Truck, 
  Factory, 
  CheckCircle2, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone,
  ArrowUpRight,
  Calculator,
  Leaf,
  Clock,
  Wrench,
  TrendingUp,
  MapPin
} from 'lucide-react';

// --- Constants & Types ---

const COLORS = {
  lime: '#CCFF00',
  solarBlue: '#00BFFF',
  black: '#000000',
  gray: '#1A1A1A',
};

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center font-bold tracking-tighter ${className}`}>
    <div className="flex flex-col leading-none">
      <span className="text-white text-2xl tracking-[0.2em]">SEVEN</span>
      <span className="text-lime text-[10px] tracking-[0.5em] font-light">ENERGY</span>
    </div>
    <span className="text-solar-blue text-4xl italic ml-1 glow-blue -mt-1">7</span>
    <span className="text-white text-2xl ml-1">SOLAR</span>
  </div>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className = "", 
  onClick 
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'outline' | 'ghost' | 'lime',
  className?: string,
  onClick?: () => void
}) => {
  const variants = {
    primary: "bg-white text-black hover:bg-lime hover:text-black",
    outline: "border border-white/20 text-white hover:border-lime hover:text-lime",
    ghost: "text-white/70 hover:text-white",
    lime: "bg-lime text-black hover:bg-white transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)]"
  };

  return (
    <button 
      onClick={onClick}
      className={`px-8 py-3 rounded-full font-medium transition-all duration-300 active:scale-95 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({ 
  subtitle, 
  title, 
  description, 
  centered = false 
}: { 
  subtitle: string, 
  title: string, 
  description?: string,
  centered?: boolean 
}) => (
  <div className={`max-w-3xl ${centered ? 'text-center mx-auto' : ''} mb-16`}>
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-lime font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-6xl font-serif font-medium mb-6 leading-tight"
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-white/60 text-lg leading-relaxed"
      >
        {description}
      </motion.p>
    )}
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Soluções', href: '#soluções' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-solar-dark-gray/80 backdrop-blur-md border-b border-white/10' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="hover:opacity-80 transition-opacity">
          <Logo />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-white/70 hover:text-lime transition-colors uppercase tracking-widest px-2 py-1"
            >
              {link.name}
            </a>
          ))}
          <Button variant="lime" className="text-sm py-2.5">Solicitar Orçamento</Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-solar-dark-gray border-b border-white/10 p-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-xl font-medium text-white/70 hover:text-lime transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button variant="lime" className="w-full text-lg">Solicitar Orçamento</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section id="home" className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          style={{ y: y1 }}
          src="https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern house with solar panels" 
          className="w-full h-full object-cover opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-solar-black via-solar-black/60 to-solar-black"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime/10 blur-[150px] rounded-full pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full mb-8 border border-white/10"
        >
          <span className="w-2 h-2 bg-lime rounded-full animate-pulse shadow-[0_0_10px_#CCFF00]"></span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Líder em Eficiência Energética</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-serif font-medium leading-[1.1] mb-8 text-white max-w-5xl mx-auto"
        >
          Economize até <span className="text-lime lime-text-glow">95%</span> <br />
          na sua conta de energia
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Projetos de energia solar de alta performance para residências, fazendas e empresas. Tecnologia que impulsiona o seu futuro.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button variant="lime" className="w-full sm:w-auto text-lg group">
            Solicitar Orçamento <ArrowUpRight className="inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
          <Button variant="outline" className="w-full sm:w-auto text-lg" onClick={() => document.getElementById('simulator')?.scrollIntoView()}>
            Simular Economia
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-lime to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
};

const Benefits = () => {
  const benefits = [
    {
      icon: <TrendingUp className="text-lime" size={32} />,
      title: "Economia Imediata",
      description: "Redução drástica na sua fatura logo no primeiro mês de instalação."
    },
    {
      icon: <Leaf className="text-lime" size={32} />,
      title: "Energia Limpa",
      description: "Contribua para o planeta utilizando a fonte de energia mais sustentável do mundo."
    },
    {
      icon: <Zap className="text-lime" size={32} />,
      title: "Retorno Rápido",
      description: "Investimento com payback estimado entre 3 a 5 anos, com alta valorização."
    },
    {
      icon: <Wrench className="text-lime" size={32} />,
      title: "Baixa Manutenção",
      description: "Sistemas robustos que exigem apenas limpezas periódicas simples."
    },
    {
      icon: <ShieldCheck className="text-lime" size={32} />,
      title: "Vida Útil de 25 Anos",
      description: "Painéis de altíssima qualidade com garantia de performance de longo prazo."
    },
    {
      icon: <Home className="text-lime" size={32} />,
      title: "Valorização do Imóvel",
      description: "Independência energética torna seu patrimônio muito mais atrativo no mercado."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-solar-black">
      <div className="container mx-auto px-6">
        <SectionHeading 
          subtitle="Por que escolher solar?"
          title="Vantagens que transformam"
          description="A Seven Solar entrega soluções que unem inteligência financeira e sustentabilidade real para o seu dia a dia."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-10 rounded-3xl group hover:border-lime/40 transition-all duration-500 neon-border"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-medium mb-4 group-hover:text-lime transition-colors">{benefit.title}</h3>
              <p className="text-white/50 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Solutions = () => {
  const solutions = [
    {
      title: "RESIDENCIAL",
      description: "Ideal para casas, condomínios e pequenos comércios que buscam conforto e economia.",
      items: ["Casas", "Condomínios", "Pequenos comércios"],
      image: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=800",
      color: "lime"
    },
    {
      title: "RURAL",
      description: "Potência para o produtor rural: irrigação, galpões e redução de custos operacionais.",
      items: ["Fazendas", "Irrigação", "Bombas", "Galpões agrícolas"],
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      color: "white"
    },
    {
      title: "INDUSTRIAL",
      description: "Soluções de grande escala para empresas e indústrias com alto consumo energético.",
      items: ["Empresas", "Indústrias", "Grandes consumos"],
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800",
      color: "solarBlue"
    }
  ];

  return (
    <section id="soluções" className="py-24 bg-solar-dark-gray">
      <div className="container mx-auto px-6">
        <SectionHeading 
          subtitle="Nossas Soluções"
          title="Energia sob medida para você"
          description="Não importa o tamanho da sua necessidade, temos um projeto otimizado para o seu perfil de consumo."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {solutions.map((sol, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[600px] rounded-[40px] overflow-hidden bg-solar-black"
            >
              <img src={sol.image} alt={sol.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-solar-black via-solar-black/40 to-transparent"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <h3 className={`text-4xl font-serif italic mb-6 ${sol.color === 'lime' ? 'text-lime' : sol.color === 'solarBlue' ? 'text-solar-blue' : 'text-white'}`}>
                  {sol.title}
                </h3>
                <p className="text-white/80 mb-8 leading-relaxed">
                  {sol.description}
                </p>
                <ul className="space-y-3 mb-10">
                  {sol.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                      <CheckCircle2 size={16} className="text-lime" /> {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full group-hover:bg-white group-hover:text-black">Saber Mais</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CalculatorSection = () => {
  const [billValue, setBillValue] = useState(500);
  const [propertyType, setPropertyType] = useState('residencial');

  const monthlySaving = billValue * 0.95;
  const yearlySaving = monthlySaving * 12;
  const plates = Math.ceil(billValue / 65);
  const payback = propertyType === 'industrial' ? 3.5 : 4.5;

  return (
    <section id="simulator" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-lime/5 -skew-y-3 origin-top-left -z-10"></div>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionHeading 
              subtitle="Simulador de Economia"
              title="Quanto você pode poupar?"
              description="Calcule agora uma estimativa realista do seu potencial de economia com a energia solar da Seven."
            />
            
            <div className="glass p-8 md:p-12 rounded-[2rem] neon-border">
              <div className="mb-10">
                <label className="block text-sm font-bold uppercase tracking-widest text-white/50 mb-4">Valor Médio da Conta (R$)</label>
                <div className="flex items-center gap-6">
                   <input 
                    type="range" 
                    min="150" 
                    max="10000" 
                    step="50" 
                    value={billValue} 
                    onChange={(e) => setBillValue(Number(e.target.value))}
                    className="flex-1 accent-lime h-2 bg-white/10 rounded-full"
                  />
                  <span className="text-3xl font-mono text-lime font-bold w-32 border-b border-lime/30 pb-1">
                    {billValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-10">
                {['residencial', 'rural', 'industrial'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${propertyType === type ? 'bg-lime text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <Button variant="lime" className="w-full">Gerar Relatório Detalhado</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass p-10 rounded-[2.5rem] flex flex-col justify-center border-lime/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <TrendingUp size={80} className="text-lime" />
               </div>
               <span className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Economia Mensal</span>
               <div className="text-4xl font-serif text-lime font-bold">R$ {monthlySaving.toFixed(2)}</div>
               <div className="text-xs text-white/30 mt-4">Redução estimada de 95%</div>
            </div>

            <div className="glass p-10 rounded-[2.5rem] flex flex-col justify-center group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Sun size={80} className="text-solar-blue" />
               </div>
               <span className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Qtde. de Placas</span>
               <div className="text-4xl font-serif text-white font-bold">{plates} Unidades</div>
               <div className="text-xs text-white/30 mt-4">Aproximadamente</div>
            </div>

            <div className="glass p-10 rounded-[2.5rem] flex flex-col justify-center group overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Calculator size={80} className="text-white" />
               </div>
               <span className="text-sm font-bold text-white/40 uppercase tracking-widest mb-2">Economia Anual</span>
               <div className="text-4xl font-serif text-white font-bold">R$ {yearlySaving.toLocaleString('pt-BR')}</div>
               <div className="text-xs text-white/30 mt-4">Mais liberdade financeira</div>
            </div>

            <div className="bg-lime p-10 rounded-[2.5rem] flex flex-col justify-center text-black shadow-[0_0_50px_rgba(204,255,0,0.2)]">
               <span className="text-sm font-bold opacity-60 uppercase tracking-widest mb-2">Retorno Médio</span>
               <div className="text-4xl font-serif font-bold italic">{payback} Anos</div>
               <div className="text-xs opacity-50 mt-4">Estimativa de Investimento</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    { title: "Fazenda Horizonte", category: "Rural", img: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=800" },
    { title: "Residência G+M", category: "Residencial", img: "https://images.unsplash.com/photo-1625841050302-3932b7bc4539?auto=format&fit=crop&q=80&w=800" },
    { title: "Indústria Pro-Logic", category: "Industrial", img: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800" },
    { title: "Condomínio Solaris", category: "Residencial", img: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <section id="projetos" className="py-24 bg-solar-black">
      <div className="container mx-auto px-6">
        <SectionHeading 
          subtitle="Portfólio"
          title="Excelência em cada painel"
          description="Nossos projetos combinam design industrial moderno com eficiência recorde."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden"
            >
              <img src={p.img} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-solar-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-lime text-[10px] font-bold uppercase tracking-[0.3em] mb-1 block">{p.category}</span>
                <h4 className="text-xl font-medium">{p.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contato" className="py-24 relative overflow-hidden">
       {/* Fake Map background effect */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="glass rounded-[3rem] p-10 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <SectionHeading 
                subtitle="Contato"
                title="Vamos construir o seu futuro hoje"
                description="Nossa equipe está pronta para desenhar o projeto ideal para a sua realidade."
              />

              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-lime/20 transition-colors">
                    <Phone className="text-lime" />
                  </div>
                  <div>
                    <span className="text-xs text-white/30 uppercase tracking-widest block mb-1">WhatsApp</span>
                    <span className="text-xl font-medium">+55 (11) 99999-9999</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-lime/20 transition-colors">
                    <Mail className="text-lime" />
                  </div>
                  <div>
                    <span className="text-xs text-white/30 uppercase tracking-widest block mb-1">Email</span>
                    <span className="text-xl font-medium">contato@sevensolar.com.br</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-lime/20 transition-colors">
                    <MapPin className="text-lime" />
                  </div>
                  <div>
                    <span className="text-xs text-white/30 uppercase tracking-widest block mb-1">Localização</span>
                    <span className="text-xl font-medium">São Paulo, SP - Brasil</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] border border-white/10">
              <form className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Nome Completo</label>
                  <input type="text" placeholder="Seu nome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime/50 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Email Corporativo</label>
                  <input type="email" placeholder="seu@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime/50 transition-colors" />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Telefone</label>
                      <input type="tel" placeholder="(11) 99999-9999" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime/50 transition-colors" />
                    </div>
                     <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Cidade/UF</label>
                      <input type="text" placeholder="Sua cidade" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime/50 transition-colors" />
                    </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Mensagem</label>
                  <textarea rows={4} placeholder="Conte um pouco sobre sua necessidade..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime/50 transition-colors resize-none"></textarea>
                </div>
                <Button variant="lime" className="w-full py-4 text-lg">Enviar Mensagem</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-solar-dark-gray border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <Logo className="mb-8" />
            <p className="text-white/50 max-w-sm mb-8 leading-relaxed">
              Liderando a revolução energética no Brasil. Tecnologia fotovoltaica de ponta para quem busca excelência e sustentabilidade.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-lime hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-lime hover:text-black transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-lime hover:text-black transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold uppercase tracking-[0.2em] text-xs text-white mb-8">Soluções</h5>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/40 hover:text-lime transition-colors">Residencial</a></li>
              <li><a href="#" className="text-white/40 hover:text-lime transition-colors">Rural & Fazendas</a></li>
              <li><a href="#" className="text-white/40 hover:text-lime transition-colors">Industrial</a></li>
              <li><a href="#" className="text-white/40 hover:text-lime transition-colors">Pequenos Comércios</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold uppercase tracking-[0.2em] text-xs text-white mb-8">Empresa</h5>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/40 hover:text-lime transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="text-white/40 hover:text-lime transition-colors">Projetos</a></li>
              <li><a href="#" className="text-white/40 hover:text-lime transition-colors">Simulador</a></li>
              <li><a href="#" className="text-white/40 hover:text-lime transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-xs text-white/30 space-y-4 md:space-y-0">
          <div>© 2024 Seven Solar Ltda. Todos os direitos reservados.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Análise", desc: "Estudamos sua conta de luz e local para dimensionar o sistema ideal." },
    { title: "Projeto", desc: "Nossos engenheiros criam um projeto técnico personalizado e eficiente." },
    { title: "Aprovação", desc: "Cuidamos de toda a burocracia com a concessionária de energia." },
    { title: "Instalação", desc: "Equipe própria realiza a montagem com máxima segurança e rapidez." },
    { title: "Economia", desc: "Pronto! Você começa a gerar sua própria energia e economizar." },
  ];

  return (
    <section className="py-24 bg-solar-dark-gray overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeading 
          subtitle="Processo de Transição"
          title="Sua jornada para a liberdade"
          description="Um caminho simples, transparente e sem dor de cabeça para você parar de pagar caro na energia."
          centered
        />

        <div className="relative mt-20">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative z-10 text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-solar-black border border-white/10 flex items-center justify-center mx-auto mb-6 group-hover:border-lime group-hover:scale-110 transition-all duration-500 glass">
                   <span className="text-2xl font-serif text-lime font-bold italic">{idx + 1}</span>
                </div>
                <h4 className="text-xl font-medium mb-3 group-hover:text-lime transition-colors">{step.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Roberto Silva", role: "Produtor Rural", text: "A Seven Solar transformou meu custo operacional. A economia na irrigação foi imediata e o suporte técnico é nota 10." },
    { name: "Ana Oliveira", role: "Proprietária Residencial", text: "Melhor investimento que já fiz. Minha conta de R$ 800 hoje custa apenas a taxa mínima. Recomendo de olhos fechados." },
    { name: "Carlos Mendes", role: "Diretor Industrial", text: "Instalamos no telhado da fábrica e o retorno sobre o investimento está superando as expectativas. Profissionais de alto nível." },
  ];

  return (
    <section className="py-24 bg-solar-black">
      <div className="container mx-auto px-6">
        <SectionHeading 
          subtitle="Depoimentos"
          title="Quem usa, aprova"
          description="Histórias reais de quem já conquistou a independência energética com a Seven Solar."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[2.5rem] border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Sun key={s} size={14} className="text-lime" fill="#CCFF00" />)}
                </div>
                <p className="text-lg italic text-white/70 mb-8 leading-relaxed">"{r.text}"</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-lime">
                   {r.name[0]}
                 </div>
                 <div>
                    <div className="font-bold">{r.name}</div>
                    <div className="text-xs text-white/30 uppercase tracking-widest">{r.role}</div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <Benefits />
      
      {/* About Section */}
      <section id="sobre" className="py-24 relative overflow-hidden bg-solar-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800" alt="About Seven Solar" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="absolute -bottom-10 -right-10 glass p-10 rounded-[2rem] hidden md:block">
                 <div className="text-5xl font-serif text-lime font-bold mb-2">+500</div>
                 <div className="text-xs uppercase tracking-widest text-white/50">Projetos Executados</div>
              </div>
            </div>
            <div>
              <SectionHeading 
                subtitle="Quem Somos"
                title="Excelência solar de ponta a ponta"
                description="A Seven Solar nasceu para levar economia, sustentabilidade e independência energética através de soluções fotovoltaicas inteligentes. Nosso foco é transformar a forma como você consome energia, unindo tecnologia de ponta e viabilidade econômica real."
              />
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="space-y-4">
                  <CheckCircle2 className="text-lime" />
                  <h4 className="text-lg font-medium">Equipe Técnica</h4>
                  <p className="text-sm text-white/40">Engenheiros especializados com vasta experiência em campo.</p>
                </div>
                <div className="space-y-4">
                   <Clock className="text-lime" />
                   <h4 className="text-lg font-medium">Instalação Ágil</h4>
                   <p className="text-sm text-white/40">Processos otimizados para entregar sua economia no menor tempo.</p>
                </div>
              </div>
              <Button variant="outline" className="mt-12">Conhecer Nossa História</Button>
            </div>
          </div>
        </div>
      </section>

      <Solutions />
      <HowItWorks />
      <CalculatorSection />
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-24 bg-lime relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
          <Sun size={400} className="text-black" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
           <h2 className="text-4xl md:text-7xl font-serif text-black font-bold mb-8 leading-tight">
             Comece hoje a economizar <br /> com energia solar
           </h2>
           <p className="text-black/60 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-light">
             Não deixe para amanhã a economia que seu bolso merece hoje. Fale com um especialista.
           </p>
           <Button variant="primary" className="bg-black text-white hover:bg-black/80 text-xl py-5 px-12">
             Solicitar Orçamento Agora
           </Button>
        </div>
      </section>

      <Projects />
      <Contact />
      <Footer />
      
      {/* Bottom Floating Bubble for Mobile WhatsApp */}
      <motion.a 
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl md:hidden"
      >
        <Phone size={28} fill="currentColor" />
      </motion.a>
    </div>
  );
};

export default App;
