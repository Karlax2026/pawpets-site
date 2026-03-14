import React, { useState } from 'react';
import { 
  ShoppingBag, GraduationCap, Heart, Menu, X, Search, 
  ShoppingCart, User, Star, PawPrint, Phone, Mail, Instagram, 
  ChevronRight, Plus, Edit, Trash2, CheckCircle
} from 'lucide-react';

// --- CONFIGURACIÓN GLOBAL Y WHATSAPP ---
const WA_NUMBER = "584125500445";

const openWhatsApp = (message) => {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

// --- DATOS INICIALES (Simulación de Base de Datos) ---
const initialProducts = [
  { 
    id: 1, name: 'Arnés Premium de Cuero', price: 25.99, category: 'arneses',
    image: 'https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?auto=format&fit=crop&q=80&w=400',
    desc: 'Arnés ajustable y ergonómico para paseos seguros.'
  },
  { 
    id: 2, name: 'Cama Ortopédica Nube', price: 45.00, category: 'accesorios',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400',
    desc: 'Espuma viscoelástica para el máximo confort de tu mascota.' 
  },
  { 
    id: 3, name: 'Juguete Interactivo Kong', price: 15.50, category: 'juguetes',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400',
    desc: 'Estimulación mental y física por horas.'
  },
  { 
    id: 4, name: 'Shampoo Avena Orgánica', price: 12.00, category: 'higiene',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400',
    desc: 'Ideal para pieles sensibles y alergias.'
  },
];

const initialPets = [
  { 
    id: 1, name: 'Max', type: 'perros', age: '2 años', size: 'Grande', gender: 'Macho', 
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400',
    status: 'Disponible', history: 'Rescatado de la calle, muy juguetón y protector.' 
  },
  { 
    id: 2, name: 'Luna', type: 'gatos', age: '6 meses', size: 'Pequeño', gender: 'Hembra', 
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
    status: 'Disponible', history: 'Encontrada en una caja, muy cariñosa y ronroneadora.' 
  },
  { 
    id: 3, name: 'Rocky', type: 'perros', age: '4 años', size: 'Mediano', gender: 'Macho', 
    image: 'https://images.unsplash.com/photo-1537151608804-ea2f1cb765f5?auto=format&fit=crop&q=80&w=400',
    status: 'En proceso', history: 'Tranquilo y obediente, ideal para apartamentos.' 
  },
];

const initialAcademy = [
  { 
    id: 1, name: 'Programa de Obediencia Básica', price: 120, duration: '4 semanas', 
    desc: 'Aprende los comandos básicos: sentado, quieto, junto y venir al llamado.'
  },
  { 
    id: 2, name: 'Corrección de Conducta', price: 150, duration: 'Personalizado',
    desc: 'Tratamiento de ansiedad por separación, agresividad y miedos.' 
  },
  { 
    id: 3, name: 'Asesoría Virtual', price: 40, duration: '1 hora', 
    desc: 'Consulta online para resolver dudas específicas de comportamiento.'
  },
];

// --- PALETA DE COLORES Y ESTILOS ---
// Beige: #FDF8F5, Salmón: #F28C8C, Chocolate: #5C3D2E
const theme = {
  bg: 'bg-[#FDF8F5]',
  text: 'text-[#5C3D2E]',
  textLight: 'text-[#8A6B5C]',
  primary: 'bg-[#5C3D2E]',
  primaryHover: 'hover:bg-[#4A3125]',
  accent: 'bg-[#F28C8C]',
  accentHover: 'hover:bg-[#E07A7A]',
  card: 'bg-white',
  border: 'border-[#EAE0D5]'
};

export default function PawPetsApp() {
  // --- ESTADO GLOBAL ---
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  // "Base de datos" en memoria
  const [products, setProducts] = useState(initialProducts);
  const [pets, setPets] = useState(initialPets);
  const [academyServices, setAcademyServices] = useState(initialAcademy);

  // --- FUNCIONES DEL CARRITO ---
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    let msg = `¡Hola PawPets! 🐾\nQuiero realizar el siguiente pedido:\n\n`;
    cart.forEach(item => {
      msg += `- ${item.qty}x ${item.name} ($${item.price.toFixed(2)})\n`;
    });
    msg += `\n*Total:* $${cartTotal.toFixed(2)}\n\n¿Me indican los métodos de pago?`;
    openWhatsApp(msg);
    setCart([]); 
    setCurrentView('home');
  };

  // --- NAVEGACIÓN ---
  const navigate = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // --- COMPONENTES DE VISTA ---
  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#EAE0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
            <PawPrint className={`h-8 w-8 ${theme.text} mr-2`} />
            <span className={`text-2xl font-bold ${theme.text} tracking-tight`}>PawPets</span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <button onClick={() => navigate('home')} className={`${theme.text} hover:text-[#F28C8C] font-medium transition`}>Inicio</button>
            <button onClick={() => navigate('shop')} className={`${theme.text} hover:text-[#F28C8C] font-medium transition`}>Paw Shop</button>
            <button onClick={() => navigate('academy')} className={`${theme.text} hover:text-[#F28C8C] font-medium transition`}>Paw Academy</button>
            <button onClick={() => navigate('adoptions')} className={`${theme.text} hover:text-[#F28C8C] font-medium transition`}>Adopciones</button>
            <button onClick={() => navigate('admin')} className={`text-xs ${theme.textLight} hover:text-[#F28C8C]`}>Panel Admin</button>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('cart')} className="relative p-2 text-gray-600 hover:text-[#F28C8C] transition">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#F28C8C] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#EAE0D5] absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => navigate('home')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-[#FDF8F5] hover:text-[#F28C8C]">Inicio</button>
            <button onClick={() => navigate('shop')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-[#FDF8F5] hover:text-[#F28C8C]">Paw Shop</button>
            <button onClick={() => navigate('academy')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-[#FDF8F5] hover:text-[#F28C8C]">Paw Academy</button>
            <button onClick={() => navigate('adoptions')} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-[#FDF8F5] hover:text-[#F28C8C]">Adopciones</button>
            <button onClick={() => navigate('admin')} className="block w-full text-left px-3 py-2 text-sm text-gray-500 hover:bg-[#FDF8F5]">Panel Admin</button>
          </div>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer className={`${theme.primary} text-white pt-12 pb-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <PawPrint className="h-8 w-8 text-[#F28C8C] mr-2" />
              <span className="text-2xl font-bold tracking-tight">PawPets</span>
            </div>
            <p className="text-[#EAE0D5] text-sm mb-4">
              Todo lo que tu mascota necesita para una vida feliz. Productos, educación y adopciones.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/pawshop.ve" target="_blank" rel="noreferrer" className="text-[#EAE0D5] hover:text-[#F28C8C]"><Instagram className="h-5 w-5"/></a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#F28C8C]">Ecosistema</h3>
            <ul className="space-y-2 text-[#EAE0D5] text-sm">
              <li><button onClick={() => navigate('shop')} className="hover:text-white transition">Paw Shop</button></li>
              <li><button onClick={() => navigate('academy')} className="hover:text-white transition">Paw Academy</button></li>
              <li><button onClick={() => navigate('adoptions')} className="hover:text-white transition">Paw Rescue</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#F28C8C]">Ayuda</h3>
            <ul className="space-y-2 text-[#EAE0D5] text-sm">
              <li><a href="#" className="hover:text-white transition">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-white transition">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-white transition">Política de Privacidad</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-[#F28C8C]">Contacto</h3>
            <ul className="space-y-3 text-[#EAE0D5] text-sm">
              <li className="flex items-center"><Phone className="h-4 w-4 mr-2" /> +58 4125500445</li>
              <li className="flex items-center"><Mail className="h-4 w-4 mr-2" /> pawpets.ve@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#8A6B5C] mt-8 pt-8 text-center text-[#EAE0D5] text-sm">
          &copy; {new Date().getFullYear()} PawPets. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );

  const HomeView = () => (
    <div className="animate-fade-in">
      <section className="relative bg-[#FDF8F5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0 z-10">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold ${theme.text} leading-tight mb-6`}>
              Todo lo que tu mascota necesita para una <span className="text-[#F28C8C]">vida feliz</span>.
            </h1>
            <p className={`text-lg md:text-xl ${theme.textLight} mb-8 max-w-2xl mx-auto lg:mx-0`}>
              Productos exclusivos, educación canina profesional y segundas oportunidades para mascotas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => navigate('shop')} className={`${theme.accent} ${theme.accentHover} text-white px-8 py-3 rounded-full font-semibold shadow-md transition transform hover:-translate-y-1 flex items-center justify-center`}>
                <ShoppingBag className="mr-2 h-5 w-5" /> Explorar Paw Shop
              </button>
              <button onClick={() => navigate('academy')} className={`bg-white text-[#5C3D2E] border-2 border-[#5C3D2E] hover:bg-[#FDF8F5] px-8 py-3 rounded-full font-semibold shadow-sm transition transform hover:-translate-y-1 flex items-center justify-center`}>
                <GraduationCap className="mr-2 h-5 w-5" /> Conocer Academy
              </button>
            </div>
            <div className="mt-4 flex justify-center lg:justify-start">
              <button onClick={() => navigate('adoptions')} className={`text-[#F28C8C] font-semibold hover:text-[#E07A7A] flex items-center underline-offset-4 hover:underline transition`}>
                <Heart className="mr-2 h-5 w-5" /> Adoptar una mascota
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-[#F28C8C] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-[#EAE0D5] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <img 
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800" 
              alt="Perro feliz" 
              className="relative z-10 rounded-3xl shadow-2xl object-cover h-[400px] w-full lg:h-[500px] border-8 border-white"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold ${theme.text} mb-4`}>El Ecosistema PawPets</h2>
            <div className="w-24 h-1 bg-[#F28C8C] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-[#FDF8F5] rounded-3xl p-8 text-center transition hover:shadow-xl border border-[#EAE0D5] group cursor-pointer" onClick={() => navigate('shop')}>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-10 w-10 text-[#F28C8C]" />
              </div>
              <h3 className={`text-xl font-bold ${theme.text} mb-3`}>Paw Shop</h3>
              <p className={`${theme.textLight} mb-6`}>Alimentos premium, accesorios exclusivos y todo para el bienestar diario de tu mascota.</p>
              <span className="text-[#F28C8C] font-semibold flex items-center justify-center">Ver tienda <ChevronRight className="h-4 w-4 ml-1" /></span>
            </div>
            
            <div className="bg-[#FDF8F5] rounded-3xl p-8 text-center transition hover:shadow-xl border border-[#EAE0D5] group cursor-pointer" onClick={() => navigate('academy')}>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <GraduationCap className="h-10 w-10 text-[#5C3D2E]" />
              </div>
              <h3 className={`text-xl font-bold ${theme.text} mb-3`}>Paw Academy</h3>
              <p className={`${theme.textLight} mb-6`}>Educación canina en positivo. Clases grupales, individuales y modificación de conducta.</p>
              <span className="text-[#5C3D2E] font-semibold flex items-center justify-center">Ver programas <ChevronRight className="h-4 w-4 ml-1" /></span>
            </div>

            <div className="bg-[#FDF8F5] rounded-3xl p-8 text-center transition hover:shadow-xl border border-[#EAE0D5] group cursor-pointer" onClick={() => navigate('adoptions')}>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Heart className="h-10 w-10 text-[#F28C8C]" />
              </div>
              <h3 className={`text-xl font-bold ${theme.text} mb-3`}>Paw Rescue</h3>
              <p className={`${theme.textLight} mb-6`}>Dales una segunda oportunidad. Conoce a nuestros peludos que buscan un hogar para siempre.</p>
              <span className="text-[#F28C8C] font-semibold flex items-center justify-center">Ver adopciones <ChevronRight className="h-4 w-4 ml-1" /></span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${theme.accent} py-20 text-center px-4`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tu mascota merece lo mejor.</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">Únete a la familia #PawPetsFamily y descubre la diferencia de cuidarlos con amor y calidad.</p>
        <button onClick={() => navigate('shop')} className="bg-white text-[#F28C8C] px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#FDF8F5] transition transform hover:scale-105">
          Ir a la Tienda
        </button>
      </section>
    </div>
  );

  const ShopView = () => {
    const [filter, setFilter] = useState('todos');
    const categories = ['todos', 'collares', 'arneses', 'juguetes', 'higiene', 'accesorios'];
    const filteredProducts = filter === 'todos' ? products : products.filter(p => p.category === filter);

    return (
      <div className={`${theme.bg} min-h-screen py-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h1 className={`text-3xl font-bold ${theme.text}`}>Paw Shop</h1>
            <div className="mt-4 md:mt-0 flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map(c => (
                <button 
                  key={c} 
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap ${filter === c ? theme.primary + ' text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden border border-[#EAE0D5] flex flex-col">
                <div className="h-56 overflow-hidden relative group">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-bold text-[#F28C8C] shadow-sm">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">{product.category}</span>
                  <h3 className={`font-bold ${theme.text} text-lg mb-2 leading-tight`}>{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.desc}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    className={`w-full ${theme.accent} ${theme.accentHover} text-white py-2 rounded-xl font-medium transition flex items-center justify-center`}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-500">No hay productos en esta categoría.</div>
          )}
        </div>
      </div>
    );
  };

  const AcademyView = () => {
    const [bookingService, setBookingService] = useState(null);
    const [formData, setFormData] = useState({ name: '', phone: '', petName: '', age: '', problem: '' });

    const handleBooking = (e) => {
      e.preventDefault();
      const msg = `¡Hola PawPets Academy! 🎓\nQuiero reservar una clase.\n\n*Servicio:* ${bookingService.name}\n*Mi Nombre:* ${formData.name}\n*Teléfono:* ${formData.phone}\n*Mascota:* ${formData.petName} (${formData.age})\n*Motivo:* ${formData.problem}`;
      openWhatsApp(msg);
      setBookingService(null);
      setFormData({ name: '', phone: '', petName: '', age: '', problem: '' });
    };

    return (
      <div className="bg-white min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <GraduationCap className="h-16 w-16 text-[#5C3D2E] mx-auto mb-4" />
            <h1 className={`text-4xl font-bold ${theme.text} mb-4`}>Educación Canina Profesional</h1>
            <p className="text-gray-600 text-lg">Fortalece el vínculo con tu mascota a través de metodologías amables y positivas. Elige el programa que mejor se adapte a sus necesidades.</p>
          </div>

          {!bookingService ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {academyServices.map(service => (
                <div key={service.id} className="bg-[#FDF8F5] rounded-3xl p-8 border border-[#EAE0D5] flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#5C3D2E] text-white px-4 py-1 rounded-bl-xl font-bold text-sm">
                    {service.duration}
                  </div>
                  <h3 className={`text-2xl font-bold ${theme.text} mb-2 mt-4`}>{service.name}</h3>
                  <div className="text-3xl font-extrabold text-[#F28C8C] mb-4">${service.price}</div>
                  <p className="text-gray-600 mb-8 flex-grow">{service.desc}</p>
                  <button 
                    onClick={() => setBookingService(service)}
                    className="w-full bg-white border-2 border-[#5C3D2E] text-[#5C3D2E] hover:bg-[#5C3D2E] hover:text-white py-3 rounded-xl font-bold transition"
                  >
                    Reservar ahora
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-[#FDF8F5] p-8 rounded-3xl border border-[#EAE0D5]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#5C3D2E]">Solicitud de Reserva</h2>
                <button onClick={() => setBookingService(null)} className="text-gray-400 hover:text-gray-600"><X /></button>
              </div>
              <div className="bg-white p-4 rounded-xl mb-6 border-l-4 border-[#F28C8C]">
                <p className="font-semibold text-gray-800">{bookingService.name}</p>
                <p className="text-sm text-gray-500">Valor referencial: ${bookingService.price}</p>
              </div>
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tu Nombre</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-2 border focus:ring-[#F28C8C] focus:border-[#F28C8C]" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (WhatsApp)</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-2 border focus:ring-[#F28C8C] focus:border-[#F28C8C]" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Mascota</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-2 border focus:ring-[#F28C8C] focus:border-[#F28C8C]" value={formData.petName} onChange={e => setFormData({...formData, petName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                    <input required type="text" className="w-full border-gray-300 rounded-lg p-2 border focus:ring-[#F28C8C] focus:border-[#F28C8C]" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Motivo / Problema a tratar</label>
                  <textarea required rows="3" className="w-full border-gray-300 rounded-lg p-2 border focus:ring-[#F28C8C] focus:border-[#F28C8C]" value={formData.problem} onChange={e => setFormData({...formData, problem: e.target.value})}></textarea>
                </div>
                <button type="submit" className={`w-full ${theme.primary} ${theme.primaryHover} text-white py-3 rounded-xl font-bold transition flex justify-center items-center`}>
                  Enviar solicitud por WhatsApp
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  };

  const AdoptionsView = () => {
    const [filter, setFilter] = useState('todos');
    const filteredPets = filter === 'todos' ? pets : pets.filter(p => p.type === filter);

    const handleAdoptRequest = (pet) => {
      const msg = `¡Hola PawPets Rescue! ❤️\nMe encantaría tener información sobre la adopción de *${pet.name}*.\n¿Me pueden enviar el formulario y los requisitos?`;
      openWhatsApp(msg);
    };

    return (
      <div className="bg-[#FDF8F5] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h1 className={`text-3xl font-bold ${theme.text} mb-2`}>Encuentra a tu mejor amigo</h1>
              <p className="text-gray-600">Dales una segunda oportunidad de ser felices.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <button onClick={() => setFilter('todos')} className={`px-5 py-2 rounded-full text-sm font-medium ${filter === 'todos' ? 'bg-[#F28C8C] text-white' : 'bg-white text-gray-600 shadow-sm'}`}>Todos</button>
              <button onClick={() => setFilter('perros')} className={`px-5 py-2 rounded-full text-sm font-medium ${filter === 'perros' ? 'bg-[#F28C8C] text-white' : 'bg-white text-gray-600 shadow-sm'}`}>Perros</button>
              <button onClick={() => setFilter('gatos')} className={`px-5 py-2 rounded-full text-sm font-medium ${filter === 'gatos' ? 'bg-[#F28C8C] text-white' : 'bg-white text-gray-600 shadow-sm'}`}>Gatos</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map(pet => (
              <div key={pet.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition overflow-hidden group">
                <div className="h-64 overflow-hidden relative">
                  <img src={pet.image} alt={pet.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${pet.status === 'Disponible' ? 'bg-green-500' : 'bg-orange-400'}`}>
                    {pet.status}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="text-2xl font-bold text-[#5C3D2E]">{pet.name}</h3>
                    <span className="text-gray-500 text-sm font-medium">{pet.gender}</span>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-500 mb-4">
                    <span className="bg-[#FDF8F5] px-2 py-1 rounded">{pet.age}</span>
                    <span className="bg-[#FDF8F5] px-2 py-1 rounded">{pet.size}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">{pet.history}</p>
                  
                  <button 
                    disabled={pet.status !== 'Disponible'}
                    onClick={() => handleAdoptRequest(pet)}
                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center transition ${pet.status === 'Disponible' ? 'bg-[#F28C8C] hover:bg-[#E07A7A] text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                  >
                    <Heart className="h-4 w-4 mr-2" /> 
                    {pet.status === 'Disponible' ? 'Solicitar Adopción' : 'En proceso...'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CartView = () => (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#5C3D2E] mb-8 flex items-center">
          <ShoppingCart className="mr-3" /> Tu Carrito
        </h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-20 bg-[#FDF8F5] rounded-3xl border border-[#EAE0D5]">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-6">Tu carrito está vacío.</p>
            <button onClick={() => navigate('shop')} className="bg-[#F28C8C] text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-[#E07A7A]">
              Ir a la tienda
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-[#EAE0D5] p-6 mb-8">
            <ul className="divide-y divide-gray-200">
              {cart.map(item => (
                <li key={item.id} className="py-6 flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border border-gray-100" />
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm">Categoría: {item.category}</p>
                    <p className="text-[#F28C8C] font-semibold">${item.price.toFixed(2)} x {item.qty}</p>
                  </div>
                  <div className="ml-4 flex flex-col items-end">
                    <span className="font-bold text-lg text-gray-800">${(item.price * item.qty).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 text-sm mt-2 flex items-center">
                      <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
              <span className="text-xl font-medium text-gray-600">Total a pagar:</span>
              <span className="text-3xl font-extrabold text-[#5C3D2E]">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="mt-8">
              <button 
                onClick={handleCheckout}
                className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white py-4 rounded-xl font-bold text-lg shadow-md transition flex justify-center items-center"
              >
                Completar pedido por WhatsApp
              </button>
              <p className="text-center text-gray-400 text-sm mt-3">Serás redirigido para confirmar el pago y envío.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // --- PANEL ADMINISTRADOR SIMPLIFICADO ---
  const AdminView = () => {
    const [tab, setTab] = useState('products');
    
    // Formulario genérico simple
    const [newItem, setNewItem] = useState({ 
      name: '', price: '', category: 'accesorios', desc: '', 
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400' 
    });

    if (!isAdminAuth) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
            <div className="text-center">
              <User className="mx-auto h-12 w-12 text-[#5C3D2E]" />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Panel de Control</h2>
              <p className="mt-2 text-sm text-gray-600">Acceso exclusivo para administradores.</p>
            </div>
            <button onClick={() => setIsAdminAuth(true)} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#5C3D2E] hover:bg-[#4A3125]">
              Entrar (Modo Demo)
            </button>
          </div>
        </div>
      );
    }

    const handleAddProduct = (e) => {
      e.preventDefault();
      const newProd = { ...newItem, id: Date.now(), price: parseFloat(newItem.price) };
      setProducts([...products, newProd]);
      alert("Producto agregado (Simulado en memoria)");
      setNewItem({ name: '', price: '', category: 'accesorios', desc: '', image: newItem.image });
    };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        <div className="w-full md:w-64 bg-[#5C3D2E] text-white flex flex-col min-h-full">
          <div className="p-6 font-bold text-xl border-b border-[#4A3125] flex justify-between items-center">
            <span>Admin Panel</span>
            <button onClick={() => setIsAdminAuth(false)} className="text-xs text-gray-300 hover:text-white">Salir</button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-2">
            <button onClick={() => setTab('products')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${tab === 'products' ? 'bg-[#4A3125]' : 'hover:bg-[#4A3125] text-gray-300'}`}>
              <ShoppingBag className="h-5 w-5 mr-3" /> Productos
            </button>
            <button onClick={() => setTab('pets')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${tab === 'pets' ? 'bg-[#4A3125]' : 'hover:bg-[#4A3125] text-gray-300'}`}>
              <Heart className="h-5 w-5 mr-3" /> Adopciones
            </button>
            <button onClick={() => setTab('academy')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${tab === 'academy' ? 'bg-[#4A3125]' : 'hover:bg-[#4A3125] text-gray-300'}`}>
              <GraduationCap className="h-5 w-5 mr-3" /> Academia
            </button>
          </nav>
        </div>

        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 capitalize">Gestión de {tab}</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-bold mb-4">Agregar Nuevo {tab === 'products' ? 'Producto' : 'Elemento'}</h2>
            
            {tab === 'products' && (
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Nombre" className="border p-2 rounded" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
                <input required type="number" step="0.01" placeholder="Precio ($)" className="border p-2 rounded" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
                <select className="border p-2 rounded" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                  <option value="collares">Collares</option>
                  <option value="arneses">Arneses</option>
                  <option value="juguetes">Juguetes</option>
                  <option value="higiene">Higiene</option>
                  <option value="accesorios">Accesorios</option>
                </select>
                <input type="text" placeholder="URL Imagen (Unsplash)" className="border p-2 rounded" value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} />
                <textarea required placeholder="Descripción breve" className="border p-2 rounded md:col-span-2" value={newItem.desc} onChange={e => setNewItem({...newItem, desc: e.target.value})}></textarea>
                <button type="submit" className="bg-[#5C3D2E] text-white py-2 rounded font-bold hover:bg-[#4A3125] md:col-span-2">
                  Guardar Producto
                </button>
              </form>
            )}
            {tab !== 'products' && (
              <div className="text-gray-500 italic">Formulario simulado para {tab}. La estructura es idéntica a productos.</div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Info</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tab === 'products' && products.map(p => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">${p.price} | {p.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3"><Edit className="h-4 w-4"/></button>
                      <button onClick={() => setProducts(products.filter(item => item.id !== p.id))} className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4"/></button>
                    </td>
                  </tr>
                ))}
                {tab === 'pets' && pets.map(p => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{p.type} | {p.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3"><Edit className="h-4 w-4"/></button>
                    </td>
                  </tr>
                ))}
                {tab === 'academy' && academyServices.map(p => (
                  <tr key={p.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">${p.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3"><Edit className="h-4 w-4"/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <main className="min-h-[calc(100vh-80px)]">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'academy' && <AcademyView />}
        {currentView === 'adoptions' && <AdoptionsView />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'admin' && <AdminView />}
      </main>
      {currentView !== 'admin' && <Footer />}
    </div>
  );
}
