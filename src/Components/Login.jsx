import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      const token = data.token;
      
      localStorage.setItem('token', token);
      
      onLogin();

    } catch (err) {
      setError(err.message);
      console.error('Error de autenticación:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-500 hover:scale-[1.01]">
        {/* Sección Izquierda - Imagen */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center relative p-6">
          <img 
            src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2910&auto=format&fit=crop" 
            alt="Fondo de la página de inicio de sesión" 
            className="rounded-xl w-full h-full object-cover shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent rounded-xl"></div>
          <div className="absolute bottom-6 left-6 text-white p-4">
            <h1 className="text-4xl font-bold tracking-tight mb-2 text-shadow-lg">¡Bienvenido!</h1>
            <p className="text-lg opacity-90 font-light">Inicia sesión para acceder a tu panel de control.</p>
          </div>
        </div>

        {/* Sección Derecha - Formulario de Login */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2 tracking-wide">
              Iniciar sesión 🔑
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Introduce tus credenciales para continuar.
            </p>
          </div>

          {error && (
            <div className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400 text-center" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Correo Electrónico
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                placeholder="ejemplo@correo.com"
                autoComplete="off"
                required
              />
            </div>

            {/* Campo de Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Contraseña
              </label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
                placeholder="••••••••"
                autoComplete="off"
                required
              />
            </div>

            {/* Recordar Contraseña y ¿Olvidaste tu contraseña? */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input type="checkbox" id="remember" name="remember" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="remember" className="ml-2 text-gray-600 dark:text-gray-400">
                  Recuérdame
                </label>
              </div>
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón de Login */}
            <button 
              type="submit" 
              className="w-full py-3 px-4 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Enlace para registrarse */}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes una cuenta?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              Regístrate aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;