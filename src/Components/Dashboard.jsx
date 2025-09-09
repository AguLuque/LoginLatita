import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  Shield, 
  BarChart3, 
  User, 
  Bell, 
  HelpCircle, 
  LogOut,
  Menu,
  X,
  Lock,
  Key,
  Smartphone,
  AlertTriangle,
  TrendingUp,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';

// Estilos CSS inline para asegurar que se vean correctamente
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: '256px',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 30
  },
  sidebarHeader: {
    padding: '16px 24px',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#111827'
  },
  nav: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.2s',
    color: '#6b7280'
  },
  navItemActive: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    borderRight: '2px solid #2563eb'
  },
  navItemHover: {
    backgroundColor: '#f9fafb',
    color: '#111827'
  },
  logoutButton: {
    padding: '16px',
    borderTop: '1px solid #e5e7eb'
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#dc2626',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  mainContent: {
    marginLeft: '256px',
    minHeight: '100vh'
  },
  mobileHeader: {
    display: 'none',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    padding: '12px 16px',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    padding: '24px'
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '8px'
  },
  pageSubtitle: {
    color: '#6b7280',
    marginBottom: '32px'
  },
  card: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    marginBottom: '24px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.2s'
  },
  statHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#111827'
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '4px'
  },
  iconContainer: {
    padding: '12px',
    borderRadius: '8px',
    color: 'white'
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  toggle: {
    position: 'relative',
    display: 'inline-flex',
    height: '24px',
    width: '44px',
    alignItems: 'center',
    borderRadius: '12px',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
    border: 'none'
  },
  toggleKnob: {
    display: 'inline-block',
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    backgroundColor: 'white',
    transition: 'transform 0.2s'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  alert: {
    padding: '16px',
    borderRadius: '8px',
    borderLeft: '4px solid'
  },
  alertSuccess: {
    backgroundColor: '#f0fdf4',
    borderLeftColor: '#22c55e',
    color: '#15803d'
  },
  alertError: {
    backgroundColor: '#fef2f2',
    borderLeftColor: '#ef4444',
    color: '#dc2626'
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px'
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '2px solid #e5e7eb',
    borderTop: '2px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  }
};

// Componente para la página de inicio
const DashboardHome = ({ onLogout }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Obtén el token de autorización de donde lo hayas guardado (ejemplo: localStorage)
      const token = localStorage.getItem('authToken'); 

      if (!token) {
        setError('No autorizado. Por favor, inicia sesión de nuevo.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/protected-data', {
          headers: {
            'Authorization': `Bearer ${token}` // Agrega el token a los encabezados
          }
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Acceso denegado. No tienes permisos para ver esta información.');
          }
          throw new Error('No se pudo obtener la información.');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

  const stats = [
    { title: 'Total de Usuarios', value: '2,847', icon: Users, color: '#3b82f6' },
    { title: 'Ingresos', value: '$45,210', icon: DollarSign, color: '#10b981' },
    { title: 'Actividad', value: '89%', icon: Activity, color: '#f59e0b' },
    { title: 'Crecimiento', value: '+12%', icon: TrendingUp, color: '#8b5cf6' },
  ];

  return (
    <div style={styles.content}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={styles.pageTitle}>Bienvenido!  </h1>
        <p style={styles.pageSubtitle}>Aquí tienes un resumen de tu actividad reciente</p>
      </div>

      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div 
            key={index} 
            style={{
              ...styles.statCard,
              ':hover': { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }
            }}
          >
            <div style={styles.statHeader}>
              <div>
                <p style={styles.statLabel}>{stat.title}</p>
                <p style={styles.statValue}>{stat.value}</p>
              </div>
              <div style={{
                ...styles.iconContainer,
                backgroundColor: stat.color
              }}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          Información del Sistema
        </h2>
        {loading && (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <span style={{ marginLeft: '8px' }}>Cargando...</span>
          </div>
        )}
        {error && (
          <div style={styles.alertError}>
            <p>{error}</p>
          </div>
        )}
        {data && (
          <div style={styles.alertSuccess}>
            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              {data.message}
            </p>
            <p>{data.data}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Página de Seguridad
const SecurityPage = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const securityItems = [
    {
      title: 'Autenticación de Dos Factores',
      description: 'Añade una capa extra de seguridad a tu cuenta',
      icon: Lock,
      enabled: true,
    },
    {
      title: 'Alertas de Inicio de Sesión',
      description: 'Recibe notificaciones cuando alguien acceda a tu cuenta',
      icon: Bell,
      enabled: loginAlerts,
      toggle: () => setLoginAlerts(!loginAlerts)
    }
  ];

  return (
    <div style={styles.content}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={styles.pageTitle}>Centro de Seguridad</h1>
        <p style={styles.pageSubtitle}>Gestiona la seguridad de tu cuenta y datos</p>
      </div>

      <div style={{
        background: 'linear-gradient(to right, #10b981, #3b82f6)',
        padding: '24px',
        borderRadius: '12px',
        color: 'white',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Shield size={32} style={{ marginRight: '12px' }} />
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Estado de Seguridad: Excelente</h2>
            <p style={{ opacity: 0.9 }}>Tu cuenta está bien protegida</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {securityItems.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  backgroundColor: '#dbeafe',
                  padding: '12px',
                  borderRadius: '8px',
                  marginRight: '16px'
                }}>
                  <item.icon size={24} color="#2563eb" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#6b7280' }}>{item.description}</p>
                </div>
              </div>
              <button
                onClick={item.toggle}
                style={{
                  ...styles.toggle,
                  backgroundColor: item.enabled ? '#3b82f6' : '#d1d5db'
                }}
              >
                <span
                  style={{
                    ...styles.toggleKnob,
                    transform: item.enabled ? 'translateX(20px)' : 'translateX(4px)'
                  }}
                />
              </button>
            </div>
          </div>
        ))}

        <div style={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{
              backgroundColor: '#fed7aa',
              padding: '12px',
              borderRadius: '8px',
              marginRight: '16px'
            }}>
              <Key size={24} color="#ea580c" />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                Cambiar Contraseña
              </h3>
              <p style={{ color: '#6b7280' }}>Actualiza tu contraseña regularmente</p>
            </div>
          </div>
          <button 
            style={{
              ...styles.button,
              ':hover': { backgroundColor: '#2563eb' }
            }}
          >
            Cambiar Contraseña
          </button>
        </div>

        <div style={styles.card}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
            Actividad Reciente
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '8px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  backgroundColor: '#dcfce7',
                  padding: '8px',
                  borderRadius: '50%',
                  marginRight: '12px'
                }}>
                  <Lock size={16} color="#16a34a" />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500' }}>Inicio de sesión exitoso</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Desde Madrid, España</p>
                </div>
              </div>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Hace 2 horas</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '8px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  backgroundColor: '#fef3c7',
                  padding: '8px',
                  borderRadius: '50%',
                  marginRight: '12px'
                }}>
                  <AlertTriangle size={16} color="#d97706" />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500' }}>Intento de acceso bloqueado</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Desde ubicación desconocida</p>
                </div>
              </div>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>Hace 1 día</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Página de Analytics
const AnalyticsPage = () => {
  const metrics = [
    { name: 'Usuarios Activos', value: '12,345', change: '+5.2%', positive: true },
    { name: 'Sesiones', value: '45,678', change: '+12.1%', positive: true },
    { name: 'Tiempo Promedio', value: '8:24', change: '-2.3%', positive: false },
    { name: 'Conversiones', value: '3.4%', change: '+0.8%', positive: true },
  ];

  return (
    <div style={styles.content}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={styles.pageTitle}>Analytics</h1>
        <p style={styles.pageSubtitle}>Analiza el rendimiento y las métricas de tu aplicación</p>
      </div>

      <div style={styles.statsGrid}>
        {metrics.map((metric, index) => (
          <div key={index} style={styles.card}>
            <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>
              {metric.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                {metric.value}
              </span>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: metric.positive ? '#10b981' : '#ef4444'
              }}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.card}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
          Gráfico de Tendencias
        </h2>
        <div style={{
          height: '256px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <BarChart3 size={64} color="#9ca3af" />
          <span style={{ marginLeft: '16px', color: '#6b7280' }}>Gráfico de analytics aquí</span>
        </div>
      </div>
    </div>
  );
};

// Página de Perfil
const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@ejemplo.com',
    phone: '+54 11 1234-5678',
    location: 'Buenos Aires, Argentina'
  });

  return (
    <div style={styles.content}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={styles.pageTitle}>Mi Perfil</h1>
        <p style={styles.pageSubtitle}>Gestiona tu información personal y preferencias</p>
      </div>

      <div style={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{
            backgroundColor: '#3b82f6',
            padding: '16px',
            borderRadius: '50%'
          }}>
            <User size={32} color="white" />
          </div>
          <div style={{ marginLeft: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
              {userInfo.name}
            </h2>
            <p style={{ color: '#6b7280' }}>Miembro desde Enero 2024</p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Nombre
            </label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
              style={styles.input}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Email
            </label>
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
              style={styles.input}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Teléfono
            </label>
            <input
              type="tel"
              value={userInfo.phone}
              onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
              style={styles.input}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Ubicación
            </label>
            <input
              type="text"
              value={userInfo.location}
              onChange={(e) => setUserInfo({...userInfo, location: e.target.value})}
              style={styles.input}
            />
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button style={styles.button}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

// Página de Notificaciones
const NotificationsPage = () => {
  const notifications = [
    { id: 1, title: 'Nueva actualización disponible', message: 'Versión 2.1.0 ya está disponible', time: '2 min', unread: true },
    { id: 2, title: 'Backup completado', message: 'Tu información ha sido respaldada exitosamente', time: '1 hora', unread: true },
    { id: 3, title: 'Nuevo usuario registrado', message: 'María García se ha unido a tu equipo', time: '3 horas', unread: false },
    { id: 4, title: 'Mantenimiento programado', message: 'El sistema estará en mantenimiento el sábado', time: '1 día', unread: false },
  ];

  return (
    <div style={styles.content}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={styles.pageTitle}>Notificaciones</h1>
        <p style={styles.pageSubtitle}>Mantente al día con las últimas actualizaciones</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            style={{
              ...styles.card,
              borderLeft: `4px solid ${notification.unread ? '#3b82f6' : '#d1d5db'}`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{
                  backgroundColor: notification.unread ? '#dbeafe' : '#f3f4f6',
                  padding: '8px',
                  borderRadius: '50%',
                  marginRight: '16px'
                }}>
                  <Bell size={20} color={notification.unread ? '#2563eb' : '#6b7280'} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                    {notification.title}
                  </h3>
                  <p style={{ color: '#6b7280', marginTop: '4px' }}>{notification.message}</p>
                </div>
              </div>
              <span style={{ fontSize: '14px', color: '#9ca3af' }}>{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Página de Ayuda
const HelpPage = () => {
  const faqs = [
    { question: '¿Cómo cambio mi contraseña?', answer: 'Ve a la sección de Seguridad y haz clic en "Cambiar Contraseña".' },
    { question: '¿Cómo habilito la autenticación de dos factores?', answer: 'En la página de Seguridad, activa el interruptor de 2FA.' },
    { question: '¿Dónde puedo ver mis estadísticas?', answer: 'Las estadísticas están disponibles en la sección Analytics.' },
    { question: '¿Cómo contacto al soporte?', answer: 'Puedes contactarnos través del formulario de contacto o por email.' },
  ];

  return (
    <div style={styles.content}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={styles.pageTitle}>Centro de Ayuda</h1>
        <p style={styles.pageSubtitle}>Encuentra respuestas a las preguntas más frecuentes</p>
      </div>

      <div style={{ ...styles.card, marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
          Preguntas Frecuentes
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => (
            <details key={index} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
              <summary style={{
                fontWeight: '600',
                color: '#111827',
                cursor: 'pointer',
                ':hover': { color: '#2563eb' }
              }}>
                {faq.question}
              </summary>
              <p style={{ color: '#6b7280', marginTop: '8px', paddingLeft: '16px' }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      <div style={{
        backgroundColor: '#eff6ff',
        padding: '24px',
        borderRadius: '12px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e40af', marginBottom: '8px' }}>
          ¿Necesitas más ayuda?
        </h3>
        <p style={{ color: '#1d4ed8', marginBottom: '16px' }}>
          Nuestro equipo de soporte está aquí para ayudarte.
        </p>
        <button style={styles.button}>
          Contactar Soporte
        </button>
      </div>
    </div>
  );
};

// Página de Configuración mejorada
const DashboardSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div style={styles.content}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={styles.pageTitle}>Configuración</h1>
        <p style={styles.pageSubtitle}>Personaliza tu experiencia en la aplicación</p>
      </div>

      <div style={styles.card}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
          Preferencias de Interfaz
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontWeight: '500', color: '#111827' }}>Modo Oscuro</h4>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Cambiar a tema oscuro</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                ...styles.toggle,
                backgroundColor: darkMode ? '#3b82f6' : '#d1d5db'
              }}
            >
              <span
                style={{
                  ...styles.toggleKnob,
                  transform: darkMode ? 'translateX(20px)' : 'translateX(4px)'
                }}
              />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontWeight: '500', color: '#111827' }}>Notificaciones</h4>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Recibir notificaciones push</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              style={{
                ...styles.toggle,
                backgroundColor: notifications ? '#3b82f6' : '#d1d5db'
              }}
            >
              <span
                style={{
                  ...styles.toggleKnob,
                  transform: notifications ? 'translateX(20px)' : 'translateX(4px)'
                }}
              />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontWeight: '500', color: '#111827' }}>Guardado Automático</h4>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Guardar cambios automáticamente</p>
            </div>
            <button
              onClick={() => setAutoSave(!autoSave)}
              style={{
                ...styles.toggle,
                backgroundColor: autoSave ? '#3b82f6' : '#d1d5db'
              }}
            >
              <span
                style={{
                  ...styles.toggleKnob,
                  transform: autoSave ? 'translateX(20px)' : 'translateX(4px)'
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Layout principal con sidebar
const DashboardLayout = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Inicio', href: '/dashboard', icon: Home, current: location.pathname === '/dashboard' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, current: location.pathname === '/dashboard/analytics' },
    { name: 'Seguridad', href: '/dashboard/security', icon: Shield, current: location.pathname === '/dashboard/security' },
    { name: 'Perfil', href: '/dashboard/profile', icon: User, current: location.pathname === '/dashboard/profile' },
    { name: 'Notificaciones', href: '/dashboard/notifications', icon: Bell, current: location.pathname === '/dashboard/notifications' },
    { name: 'Configuración', href: '/dashboard/settings', icon: Settings, current: location.pathname === '/dashboard/settings' },
    { name: 'Ayuda', href: '/dashboard/help', icon: HelpCircle, current: location.pathname === '/dashboard/help' },
  ];

  return (
    <div style={styles.container}>
      {/* CSS para animaciones */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .nav-item:hover {
            background-color: #f9fafb !important;
            color: #111827 !important;
          }
          .button:hover {
            background-color: #2563eb !important;
          }
          .logout-btn:hover {
            background-color: #fef2f2 !important;
          }
          .stat-card:hover {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          }
          @media (max-width: 1024px) {
            .sidebar {
              display: ${sidebarOpen ? 'flex' : 'none'} !important;
            }
            .main-content {
              margin-left: 0 !important;
            }
            .mobile-header {
              display: flex !important;
            }
          }
        `}
      </style>

      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(17, 24, 39, 0.5)',
            zIndex: 40,
            display: 'none'
          }}
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div style={styles.sidebar} className="sidebar">
        <div style={styles.sidebarHeader}>
          <span>Mi Dashboard</span>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px'
            }}
            className="close-btn"
          >
            <X size={24} color="#6b7280" />
          </button>
        </div>
        
        <nav style={styles.nav}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              style={{
                ...styles.navItem,
                ...(item.current ? styles.navItemActive : {}),
              }}
              className="nav-item"
            >
              <item.icon size={20} style={{ marginRight: '12px' }} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div style={styles.logoutButton}>
          <button
            onClick={onLogout}
            style={styles.logoutBtn}
            className="logout-btn"
          >
            <LogOut size={20} style={{ marginRight: '12px' }} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={styles.mainContent} className="main-content">
        {/* Header móvil */}
        <div style={styles.mobileHeader} className="mobile-header">
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              color: '#6b7280',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Menu size={24} />
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>Dashboard</h1>
          <button
            onClick={onLogout}
            style={{
              padding: '8px',
              borderRadius: '6px',
              color: '#dc2626',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Contenido */}
        <main style={{ minHeight: '100vh' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

// Componente principal del dashboard
const Dashboard = ({ onLogout }) => {
  return (
    <DashboardLayout onLogout={onLogout}>
      <Routes>
        <Route path="/" element={<DashboardHome onLogout={onLogout} />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<DashboardSettings />} />
        <Route path="help" element={<HelpPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;